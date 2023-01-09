/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseLRL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/im';
var stdDBName = "pi_db";
var stdRelationName = "root";
var connToken = '90932432|-31949270171616645|90955282';

$('#stdrno').focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
}

function getstdrnoAsJsonObj() {

    var stdrno = $('#stdrno').val();
    var jsonStr = {
        id: stdrno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.date).record;
    $('#stdname').val(record.name);
    $('#stdclass').val(record.class_);
    $('#dob').val(record.dob);
    $('#address').val(record.address);
    $('#doe').val(record.doe);
}

function resetForm() {
    $('#stdrno').val("");
    $('#stdname').val("");
    $('#stdclass').val("");
    $('#dob').val();
    $('#address").val("');
    $('#doe').val("");
    $('#stdrno').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#change').prop("disabled", true);
    $('#reset').prop("disabled", true);
    $('#stdrno').focus();
}

function validateData() {
    var stdrno, stdname, stdclass, dob, address, doe;
    stdrno = $('#stdrno').val();
    stdname = $('#stdname').val();
    stdclass = $('#stdclass').val();
    dob = $('#dob').val();
    address = $('#address').val();
    doe = $('#doe').val();
    if (stdrno === '') {
        alert("Student Roll No missing");
        $('#stdrno').focus();
        return "";
    }
    if (stdname === "") {
        alert('Student Name missing');
        $('#stdname').focus();
        return "";
    }
    if (stdclass === "") {
        alert('Student class missing');
        $('#stdclass').focus();
        return "";
    }
    if (dob === "") {
        alert('Date of Birth missing');
        $('#dob').focus();
        return "";
    }
    if (address === "") {
        alert('Address missing');
        $('#address').focus();
        return "";
    }
    if (doe === "") {
        alert('Enrollment Date missing');
        $('#doe').focus();
        return "";
    }
    var jsonStrObj = {
        id: stdrno,
        name: stdname,
        class_: stdclass,
        dob: dob,
        address: address,
        doe: doe
    };
    return JSON.stringify(jsonStrObj);
}

function getstd() {
    var stdIdJsonObj = getstdIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, stdIdJsonObj);
    jQuery.ajaxSetup({
        async: false
    });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseLRL, jpdbIRL);
    jQuery.ajaxSetup({
        async: true
    });
    if (resJsonObj.status === 400) {
        $('#save').prop("disabled", false);
        $('#reset').prop("disabled", false);
        $('#stdname').focus();
    } else if (resJsonObj.status === 200) {
        $('#stdid').prop("disabled", true);
        fillData(resJsonObj);
        $('#change').prop("disabled", false);
        $('#reset').prop("disabled", false);
        $('#stdname').focus();
    }
}

function saveData() {
    var jsonStrobj = varidateData();
    if (jsonStrobj === '') {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrobj, stdDBName, stdRelationName);
    jQuery.ajaxSetup({
        async: false
    });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseLRL, jpdbIML);
    jQuery.ajaxSetup({
        async: true
    });
    resetForm();
    $('#stdrno').focus();
}

function changeData() {
    $('#change').prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stdDBName, stdRelationName);
    jQuery.ajaxSetup({
        async: false
    });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseLRL, jpdbIML);
    jQuery.ajaxSetup({
        async: true
    });
    console.log(resJsonObj);
    resetForm();
    $('#stdid').focus();
}