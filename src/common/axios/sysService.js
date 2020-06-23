//采集状态查询 数量信息
export function getCollectStateQueryByCount(provId, omcId, typeId, beginTime, endTime) {
    var sum = 2;
    return new Promise(function (resolve, reject) {
        resolve(sum);
    });
}

//采集状态查询信息
export function getCollectStateQueryByInfo(provId, omcId, typeId, beginTime, endTime, beginIndex, endIndex) {
    var list = getCollectStateQueryByInfoTest();
    return new Promise(function (resolve, reject) {
        resolve(list);
    });
}

//采集状态查询信息 根据RUL获取文本文件信息 
export function getCollectStateTextByUrl(url) {
    // $.ajax({
    //     type: "get",
    //     url: url,
    //     dataType: "text",
    //     async: true
    // }).done(function (data) {
    //     resolve(data);
    // });
}

//质量24小时查询信息
export function getQualityQueryByInfo(provId, omcId, typeId, beginTime, endTime) {
    var list = getQualityQueryByInfoTest();
    return new Promise(function (resolve, reject) {
        resolve(list);
    });
}

//下发补充采集指令
export function getQualityInstructions(omcId, typeId, sbeginTime) {
    // var tempUrl = "ttp://xxx.xxx.xxx/dc_task.sdb?omc_id=3402&type=zx_pc_1a.2.0&stime=2020-05-20 00:00:00&etime=2020-05-20 23:00:00"
    // $.ajax({
    //     type: "get",
    //     url: tempUrl,
    //     async: true
    // }).done(function (data) {
    //     resolve(data);
    // });
}

//系统运行状态查询 数量信息
export function getSystemRunStateQueryByCount(ipText, beginTime, endTime) {
    var sum = 2;
    return new Promise(function (resolve, reject) {
        resolve(sum);
    });
}

//系统运行状态查询信息
export function getSystemRunStateQueryByInfo(ipText, beginTime, endTime, beginIndex, endIndex) {
    var list = getSystemRunStateQueryByInfoTest();
    return new Promise(function (resolve, reject) {
        resolve(list);
    });
}

//系统运行状态 历史状态查询
export function getSystemHistoryQuery(ipText, entityName, beginTime, endTime) {
    var list = getSystemHistoryQueryTest();
    return new Promise(function (resolve, reject) {
        resolve(list);
    });
}

//采集状态查询信息 测试数据集合
function getCollectStateQueryByInfoTest() {
    var list = [];
    list.push({
        province_name: "安徽",
        omc_id: 3402,
        omc_name: "AH_OMC2",
        type_name: "zx_pc_1a_2.0",
        dc_data_time: "2020-05-05 00:15:00",
        dc_ip: "192.168.1.1",
        task_run_time: "2020-06-20 22:13:10",
        run_secs: 14,
        dc_count: 2,
        dc_rows: 21090,
        dc_info: "file Rows:21090 Error Rows:0",
        omc_file_num: 10,
        omc_file_rows: 1908,
        omc_file_info: "https://www.baidu.com/"
    });
    list.push({
        province_name: "安徽",
        omc_id: 3402,
        omc_name: "AH_OMC2",
        type_name: "zx_pc_1a_2.0",
        dc_data_time: "2020-05-05 00:30:00",
        dc_ip: "192.168.1.1",
        task_run_time: "2020-06-20 22:13:10",
        run_secs: 19,
        dc_count: 4,
        dc_rows: 2109,
        dc_info: "file Rows:2109 Error Rows:10",
        omc_file_num: 10,
        omc_file_rows: 1908,
        omc_file_info: "https://www.baidu.com/"
    });
    return list;
}

//质量24小时查询信息 测试数据
//> 99 green
//> 95 GreenYellow
//> 90 Yellow
//<=90 red
function getQualityQueryByInfoTest() {
    var list = [];
    list.push({
        province_name: "安徽",
        omc_id: 3402,
        omc_name: "AH_OMC2",
        type_name: "zx_pc_1a_2",
        data_start_time: "2020-05-05 00:00:00",
        data_rows: 85060,
        integrity_rate: 99,
        description: "15min*4 ROWS:85060 CM/PM OK ROWS：7898"
    });
    list.push({
        province_name: "安徽",
        omc_id: 3402,
        omc_name: "AH_OMC2",
        type_name: "zx_pc_1a_2",
        data_start_time: "2020-05-05 01:00:00",
        data_rows: 85060,
        integrity_rate: 95,
        description: "15min*4 ROWS:85060 CM/PM OK ROWS：7898"
    });
    list.push({
        province_name: "安徽",
        omc_id: 3402,
        omc_name: "AH_OMC2",
        type_name: "zx_pc_1a_2",
        data_start_time: "2020-05-05 02:00:00",
        data_rows: 85060,
        integrity_rate: 90,
        description: "15min*4 ROWS:85060 CM/PM OK ROWS：7898"
    });
    list.push({
        province_name: "安徽",
        omc_id: 3402,
        omc_name: "AH_OMC2",
        type_name: "zx_pc_1a_2",
        data_start_time: "2020-05-05 03:00:00",
        data_rows: 85060,
        integrity_rate: 85,
        description: "15min*4 ROWS:85060 CM/PM OK ROWS：7898"
    });
    return list;
}

function getSystemRunStateQueryByInfoTest() {
    var list = [];
    list.push({
        host_ip: "127.1.1.1",
        host_name: "smp123-zhang",
        check_time: "2020-2-5 10:10:10",
        entity_group: "基础检查",
        entity_name: "CPU内存检查",
        severity_txt: "正常状态",
        description: "top -t 127.1.1.1 run test status OK",
        data: "<data><CPU负荷><![CDATA[27.8]]></CPU负荷><SWAP可用><![CDATA[36912]]></SWAP可用><SWAP可用率><![CDATA[90.11]]></SWAP可用率><SWAP总数><![CDATA[40959]]></SWAP总数><sleep进程数><![CDATA[518]]></sleep进程数><活动进程数><![CDATA[4]]></活动进程数><僵死进程数><![CDATA[0]]></僵死进程数><进程总数><![CDATA[522]]></进程总数><内存可用><![CDATA[31417]]></内存可用><内存可用率><![CDATA[97.84]]></内存可用率><内存总数><![CDATA[32108]]></内存总数><停止进程数><![CDATA[0]]></停止进程数></data>",
        property: "<property><CPU负荷><![CDATA[27.8]]></CPU负荷><SWAP可用><![CDATA[36912]]></SWAP可用><SWAP可用率><![CDATA[90.11]]></SWAP可用率><SWAP总数><![CDATA[40959]]></SWAP总数><sleep进程数><![CDATA[518]]></sleep进程数><活动进程数><![CDATA[4]]></活动进程数><僵死进程数><![CDATA[0]]></僵死进程数><进程总数><![CDATA[522]]></进程总数><内存可用><![CDATA[31417]]></内存可用><内存可用率><![CDATA[97.84]]></内存可用率><内存总数><![CDATA[32108]]></内存总数><停止进程数><![CDATA[0]]></停止进程数></property>"
    });
    list.push({
        host_ip: "127.1.1.2",
        host_name: "smp123-zhang",
        check_time: "2020-2-5 10:10:10",
        entity_group: "基础检查",
        entity_name: "CPU内存检查",
        severity_txt: "正常状态",
        description: "top -t 127.1.1.1 run test status OK",
        data: "<data><CPU负荷><![CDATA[27.8]]></CPU负荷><SWAP可用><![CDATA[36912]]></SWAP可用><SWAP可用率><![CDATA[90.11]]></SWAP可用率><SWAP总数><![CDATA[40959]]></SWAP总数><sleep进程数><![CDATA[518]]></sleep进程数><活动进程数><![CDATA[4]]></活动进程数><僵死进程数><![CDATA[0]]></僵死进程数><进程总数><![CDATA[522]]></进程总数><内存可用><![CDATA[31417]]></内存可用><内存可用率><![CDATA[97.84]]></内存可用率><内存总数><![CDATA[32108]]></内存总数><停止进程数><![CDATA[0]]></停止进程数></data>",
        property: "<property><CPU负荷><![CDATA[27.8]]></CPU负荷><SWAP可用><![CDATA[36912]]></SWAP可用><SWAP可用率><![CDATA[90.11]]></SWAP可用率><SWAP总数><![CDATA[40959]]></SWAP总数><sleep进程数><![CDATA[518]]></sleep进程数><活动进程数><![CDATA[4]]></活动进程数><僵死进程数><![CDATA[0]]></僵死进程数><进程总数><![CDATA[522]]></进程总数><内存可用><![CDATA[31417]]></内存可用><内存可用率><![CDATA[97.84]]></内存可用率><内存总数><![CDATA[32108]]></内存总数><停止进程数><![CDATA[0]]></停止进程数></property>"
    });
    list.push({
        host_ip: "127.1.1.3",
        host_name: "smp123-zhang",
        check_time: "2020-2-5 10:10:10",
        entity_group: "基础检查",
        entity_name: "CPU内存检查",
        severity_txt: "正常状态",
        description: "top -t 127.1.1.1 run test status OK",
        data: "<data><CPU负荷><![CDATA[27.8]]></CPU负荷><SWAP可用><![CDATA[36912]]></SWAP可用><SWAP可用率><![CDATA[90.11]]></SWAP可用率><SWAP总数><![CDATA[40959]]></SWAP总数><sleep进程数><![CDATA[518]]></sleep进程数><活动进程数><![CDATA[4]]></活动进程数><僵死进程数><![CDATA[0]]></僵死进程数><进程总数><![CDATA[522]]></进程总数><内存可用><![CDATA[31417]]></内存可用><内存可用率><![CDATA[97.84]]></内存可用率><内存总数><![CDATA[32108]]></内存总数><停止进程数><![CDATA[0]]></停止进程数></data>",
        property: "<property><CPU负荷><![CDATA[27.8]]></CPU负荷><SWAP可用><![CDATA[36912]]></SWAP可用><SWAP可用率><![CDATA[90.11]]></SWAP可用率><SWAP总数><![CDATA[40959]]></SWAP总数><sleep进程数><![CDATA[518]]></sleep进程数><活动进程数><![CDATA[4]]></活动进程数><僵死进程数><![CDATA[0]]></僵死进程数><进程总数><![CDATA[522]]></进程总数><内存可用><![CDATA[31417]]></内存可用><内存可用率><![CDATA[97.84]]></内存可用率><内存总数><![CDATA[32108]]></内存总数><停止进程数><![CDATA[0]]></停止进程数></property>"
    });
    return list;
}

function getSystemHistoryQueryTest() {
    var list = [];
    list.push({
        host_ip: "127.1.1.3",
        host_name: "smp123-zhang",
        check_time: "2020-2-5 10:10:10",
        entity_group: "基础检查",
        entity_name: "CPU内存检",
        severity_txt: "正常状态",
        value: 23.5
    });
    list.push({
        host_ip: "127.1.1.3",
        host_name: "smp123-zhang",
        check_time: "2020-2-5 09:10:10",
        entity_group: "基础检查",
        entity_name: "CPU内存检",
        severity_txt: "正常状态",
        value: 23.7
    });
    list.push({
        host_ip: "127.1.1.3",
        host_name: "smp123-zhang",
        check_time: "2020-2-5 08:10:10",
        entity_group: "基础检查",
        entity_name: "CPU内存检",
        severity_txt: "正常状态",
        value: 20.5
    });
    list.push({
        host_ip: "127.1.1.3",
        host_name: "smp123-zhang",
        check_time: "2020-2-5 10:10:10",
        entity_group: "基础检查",
        entity_name: "虚拟内存",
        severity_txt: "正常状态",
        value: 23.5
    });
    list.push({
        host_ip: "127.1.1.3",
        host_name: "smp123-zhang",
        check_time: "2020-2-5 09:10:10",
        entity_group: "基础检查",
        entity_name: "虚拟内存",
        severity_txt: "正常状态",
        value: 23.7
    });
    list.push({
        host_ip: "127.1.1.3",
        host_name: "smp123-zhang",
        check_time: "2020-2-5 08:10:10",
        entity_group: "基础检查",
        entity_name: "虚拟内存",
        severity_txt: "正常状态",
        value: 20.5
    });
    return list;
}

