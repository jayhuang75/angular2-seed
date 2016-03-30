import * as gulp from 'gulp';
import {
  PROD_DEST,
  DEPLOY_DEST
} from '../../config';

export = () => {
    var filesToMove = [
      PROD_DEST + '/assets/*.*/*.*',
      PROD_DEST + '/css/*.*',
      PROD_DEST + '/js/*.*',
      PROD_DEST + '/index.html',
      PROD_DEST + '/sw.js'
    ];
    return gulp.src(filesToMove, { base: PROD_DEST })
      .pipe(gulp.dest(DEPLOY_DEST));
}
