#! /usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const reactCreator = require('./reactCreator');
const dirCreator = require('./dirCreator');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

let triggered = false;
program.version('0.0.1', '-v, --version').usage('[options]');

program.command('*', { noHelp: true }).action(() => {
	console.log(chalk.red('\n해당 명령어를 찾을 수 없습니다.\n'));
	program.help();
});

program.parse(process.argv);

if (!triggered) {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'type',
				message: '\n 어떤 컴포넌트를 생성할 지 선택하세요',
				choices: [ '프레젠트 컴포넌트', '컨테이너 컴포넌트' ]
			},
			{
				type: 'list',
				name: 'style',
				message: '\n 어떤 방식의 CSS를 사용할지 정해주세요',
				choices: [ 'SASS', 'Styled-components' ]
			},
			{
				type: 'input',
				name: 'name',
				message: '\n 파일의 이름을 입력하세요(복수 가능)',
				default: 'Comp'
			},
			{
				type: 'input',
				name: 'directory',
				message: '\n 파일이 위치할 경로를 입력해주세요(./src에서 시작)',
				default: './UI_Components'
			},
			{
				type: 'confirm',
				name: 'confirm',
				message: '\n생성하시겠습니까?'
			}
		])
		.then((answers) => {
			const { confirm, name, type, directory, style } = answers;
			const nameArray = name.split(' ');
			nameArray.forEach((item) => {
				dirCreator.mkdir(`src/${directory}/${item}`);
				const pathToFile = path.join(`src/${directory}/${item}`, `/index.js`);

				if (dirCreator.exist(pathToFile)) {
					console.error(chalk.red(`\n 이미 해당 ${item} 파일이 존재합니다.\n`));
				} else {
					if (confirm) {
						if (style === 'SASS') {
							const pathToScss = path.join(`src/${directory}/${item}`, `/index.scss`);
							if (type === '컨테이너 컴포넌트') {
								fs.writeFileSync(pathToFile, reactCreator.reactContainerTemplate(item));
								fs.writeFileSync(pathToScss, '');
								console.log(chalk.green(`\n ${item} 컴포넌트가 생성되었습니다.\n`));
							} else if (type === '프레젠트 컴포넌트') {
								fs.writeFileSync(pathToFile, reactCreator.reactPresentTemplate(item));
								fs.writeFileSync(pathToScss, '');
								console.log(chalk.green(`\n ${item} 컴포넌트가 생성되었습니다. \n`));
							}
						} else if (style === 'Styled-components') {
							if (type === '컨테이너 컴포넌트') {
								fs.writeFileSync(pathToFile, reactCreator.reactContainerTemplate(item));
								console.log(chalk.green(`\n ${item} 컴포넌트가 생성되었습니다.\n`));
							} else if (type === '프레젠트 컴포넌트') {
								fs.writeFileSync(pathToFile, reactCreator.reactPresentTemplate(item));
								console.log(chalk.green(`\n ${item} 컴포넌트가 생성되었습니다. \n`));
							}
						}
					}
				}
			});
			console.log(chalk.bgGreen.rgb(00, 00, 00).bold(`\n 모든 컴포넌트가 생성되었습니다. \n`));
		});
}
