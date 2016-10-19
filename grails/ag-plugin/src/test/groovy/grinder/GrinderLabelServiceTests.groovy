package grinder

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(GrinderLabelService)
class GrinderLabelServiceTests extends Specification{

    @spock.lang.Ignore
    void test_getLabelKeys() {
        def res = service.getLabelKeys("xxx")
        assert res.size == 2
        assert res[0] == "xxx.label"
        assert res[1] == "default.xxx.label"

        def res2 = service.getLabelKeys("xxx.yyy.zzz")
        assert res2.size == 4
        assert res2[0] == "xxx.yyy.zzz.label"
        assert res2[1] == "yyy.zzz.label"
        assert res2[2] == "zzz.label"
        assert res2[3] == "default.zzz.label"

    }

}
