import {MicroBuildHelper} from "./.micro-build/x/microbuild-helper";
import {MicroBuildConfig, ELabelNames, EPlugins} from "./.micro-build/x/microbuild-config";
import {JsonEnv} from "./.jsonenv/_current_result";
declare const build: MicroBuildConfig;
declare const helper: MicroBuildHelper;
/*
 +==================================+
 | <**DON'T EDIT ABOVE THIS LINE**> |
 | THIS IS A PLAIN JAVASCRIPT FILE  |
 |   NOT A TYPESCRIPT OR ES6 FILE   |
 |    ES6 FEATURES NOT AVAILABLE    |
 +==================================+
 */

const projectName = 'privoxy-cn';

build.baseImage('alpine', 'latest');
build.projectName(projectName);
build.domainName(projectName + '.' + JsonEnv.baseDomainName);

build.noDataCopy();

build.isInChina(JsonEnv.gfw.isInChina);
build.forceLocalDns();
build.systemInstallMethod('apk');
build.systemInstall('privoxy');

build.startupCommand('--no-daemon', './privoxy/config');
build.shellCommand('/usr/sbin/privoxy');
// build.stopCommand('stop.sh');

build.forwardPort(8080, 'tcp').publish(8080);

build.disablePlugin(EPlugins.jenv);

build.volume('./privoxy', '/data/privoxy');

build.dependService('shadowsocks-client', 'https://github.com/GongT/shadowsocks-client.git');

build.onConfig(() => {
	helper.createTextFile(`
~${projectName}.${JsonEnv.baseDomainName}
`).save('./privoxy/trust');
});
