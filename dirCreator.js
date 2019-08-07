const path = require('path');
const fs = require('fs');
const dirCreator = (function() {
	const exist = (dir) => {
		try {
			fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
			return true;
		} catch (e) {
			return false;
		}
	};
	const mkdir = (dir) => {
		const dirname = path.relative('.', path.normalize(dir)).split(path.sep).filter((p) => !!p);
		dirname.forEach((d, index) => {
			const pathBuilder = dirname.slice(0, index + 1).join(path.sep);
			if (!exist(pathBuilder)) {
				fs.mkdirSync(pathBuilder);
			}
		});
	};
	return { mkdir, exist };
})();

module.exports = dirCreator;
