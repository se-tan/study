package system.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogInterceptor {

    private final Logger log;

    public LogInterceptor() {
        this.log = LoggerFactory.getLogger(this.getClass());
    }

    @Before("execution(* system.controller..*(..)) || execution(* system.service..*(..))")
    public void execBefore(JoinPoint joinPoint) {
        methodLog(joinPoint.getTarget().getClass().toString(), joinPoint.getSignature().getName(), "Start");
    }

    @After("execution(* system.controller..*(..)) || execution(* system.service..*(..))")
    public void execAfter(JoinPoint joinPoint) {
        methodLog(joinPoint.getTarget().getClass().toString(), joinPoint.getSignature().getName(), "End");
    }

    private void methodLog(String className, String methodName, String message){
        log.info(className + "." + methodName + "() " + message + ".");
    }

}
