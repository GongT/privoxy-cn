import {MicroBuildConfig, EPlugins} from "./x/microbuild-config";
declare const build: MicroBuildConfig;
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
build.domainName(projectName + '.gongt');

build.noDataCopy();

build.isInChina(JsonEnv.gfw.isInChina);
build.systemInstallMethod('apk');
build.systemInstall('privoxy');

build.startupCommand('--no-daemon', './privoxy/config');
build.shellCommand('/usr/sbin/privoxy');
// build.stopCommand('stop.sh');

build.forwardPort(8080, 'tcp').publish(8080);

build.disablePlugin(EPlugins.jenv);

build.volume('./privoxy', '/data/privoxy');

build.dependService('shadowsocks-client', 'http://github.com/GongT/shadowsocks-client.git');
