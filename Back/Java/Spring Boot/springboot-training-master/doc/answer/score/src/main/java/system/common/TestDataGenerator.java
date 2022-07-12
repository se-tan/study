package system.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.event.*;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import system.model.Score;
import system.repository.DefaultRepository;

@Component
@ConditionalOnProperty(prefix = "extension.test.generator", name = "enabled", matchIfMissing = false)
public class TestDataGenerator {

    @Autowired
    private DefaultRepository rep;

    private static final int SIZE = 7;

    @EventListener(ContextRefreshedEvent.class)
    public void onApplicationEvent(ContextRefreshedEvent event) {
        event.getApplicationContext().getBean(TestDataGenerator.class).createTestData();
    }

    @Transactional
    public void createTestData() {
        for (int i = 1; i <= SIZE; i++) {
            Score s = new Score();
            s.setStudentNumber(String.format("21%04d", i));
            s.setName("テスト_" + i);
            s.setMathScore(i * 32 % 100);
            s.setEnglishScore(i * 73 % 100);
            s.setPhysicsScore(i * 58 % 100);
            s.register(rep);
        }
    }

}
