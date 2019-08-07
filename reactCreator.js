// IIFE를 사용한 모듈패턴으로 함수의 이름이나, 변수가 겹치는 것을 방지하고 reactCreator로 네임스페이스를 만들어준다.
const reactCreator = (function() {
	const reactPresentTemplate = function(name) {
		const temp = `import React from 'react';
import styles from './index.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ${name} = (props) => {
    return(
        <>
    
        </>
    );
};

export default ${name};
            `;
		return temp;
	};
	const reactContainerTemplate = function(name) {
		const temp = `import React, {Component} from 'react';
import styles from './index.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ${name} extends Component{
    render(){
        return(
        <>
    
        </>
    );
    }
};

export default ${name};
            `;
		return temp;
	};
	return { reactPresentTemplate, reactContainerTemplate };
})();

module.exports = reactCreator;
