package system.anotation;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.*;

import javax.validation.*;
import javax.validation.constraints.*;

/**
 * ISBN(必須)を表現する制約注釈。
 * 13文字以上、17文字以下
 * 半角数字と-(ハイフン)のみ入力可能
 */
@Documented
@Constraint(validatedBy = {})
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER })
@Retention(RUNTIME)
@ReportAsSingleViolation
@NotBlank
@Size
@Pattern(regexp = "")
public @interface ISBN {
    String message() default "{error.domain.isbn}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    @OverridesAttribute(constraint = Size.class, name = "min")
    int min() default 13;

    @OverridesAttribute(constraint = Size.class, name = "max")
    int max() default 17;

    @OverridesAttribute(constraint = Pattern.class, name = "regexp")
    String regexp() default "^[0-9][0-9-]*$";

    @OverridesAttribute(constraint = Pattern.class, name = "flags")
    Pattern.Flag[] flags() default {};

    @Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER })
    @Retention(RUNTIME)
    @Documented
    public @interface List {
        ISBN[] value();
    }
}
