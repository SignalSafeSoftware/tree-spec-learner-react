import { runSmokePackage } from './smoke-package-lib.mjs';

runSmokePackage({
    runtimeChecks: [{
        subpath: '.',
        exports: ['default', 'TreeSpecDecisionView'],
    }],
    typecheckSubpaths: ['.'],
});
