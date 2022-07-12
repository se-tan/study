package system.repository;

import java.io.Serializable;
import java.util.*;

import javax.persistence.*;
import javax.validation.ValidationException;

import org.springframework.stereotype.Repository;

import system.model.Model;

@Repository
public class DefaultRepository {

    @PersistenceContext(unitName = "entityManagerFactory")
    private EntityManager em;

    public <T extends Model> Optional<T> get(Class<T> clazz, Serializable id) {
        T m = em.find(clazz, id);
        if (m != null)
            m.hashCode(); // force loading
        return Optional.ofNullable(m);
    }

    public <T extends Model> T load(Class<T> clazz, Serializable id) {
        try {
            T m = em.getReference(clazz, id);
            m.hashCode(); // force loading
            return m;
        } catch (EntityNotFoundException e) {
            throw new ValidationException("EntityNotFound");
        }
    }

    public <T extends Model> T save(T entity) {
        em.persist(entity);
        return entity;
    }

    public <T extends Model> T update(T entity) {
        return em.merge(entity);
    }

    public <T extends Model> T delete(T entity) {
        em.remove(entity);
        return entity;
    }

    public DefaultRepository flush() {
        em.flush();
        return this;
    }

    public DefaultRepository flushAndClear() {
        em.flush();
        em.clear();
        return this;
    }

    /** JPQL で検索します。 */
    @SuppressWarnings("unchecked")
    public <T> List<T> find(final String qlString, final Object... args) {
        Query query = em.createQuery(qlString);
        if (args != null) {
            for (int i = 0; i < args.length; i++) {
                Object arg = args[i];
                if (arg instanceof Map<?, ?>) {
                    Map<String, Object> argNamed = (Map<String, Object>) arg;
                    argNamed.forEach((k, v) -> query.setParameter(k, v));
                } else {
                    query.setParameter(i + 1, arg);
                }
            }
        }
        return query.getResultList();
    }
}
