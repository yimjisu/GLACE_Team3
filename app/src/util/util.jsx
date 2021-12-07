export function phoneCheck() {
    var phone = document.getElementById('phone').value;

    if (phone == '') {
        document.getElementById('phoneCheck').innerHTML = "";
        return false;
    }

    if (!/^010[0-9]{8}$/.test(phone)) {
        document.getElementById('phoneCheck').innerHTML = "유효하지 않은 휴대폰 번호입니다.";
        document.getElementById('phoneCheck').style.color = 'red';
        return false;
    }
    else {
        document.getElementById('phoneCheck').innerHTML = "유효한 휴대폰 번호입니다.";
        document.getElementById('phoneCheck').style.color = 'blue';
        return true;
    }
}

export function pwSame() {
    var pw = document.getElementById('pw').value;
    var confirmPW = document.getElementById('confirmPw').value;

    if (confirmPW == '') {
        document.getElementById('pwSame').innerHTML = "";
        return false;
    }

    if (pw == confirmPW) {
        document.getElementById('pwSame').innerHTML = '비밀번호가 일치합니다.';
        document.getElementById('pwSame').style.color = 'blue';
        return true;
    }
    else {
        document.getElementById('pwSame').innerHTML = '비밀번호가 일치하지 않습니다.';
        document.getElementById('pwSame').style.color = 'red';
        return false;
    }

}

export function pwCheck() {
    const pw = document.getElementById('pw').value;
    var confirmPW = document.getElementById('confirmPw').value;
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/ig);
    const spe = pw.search(/[`~!@#$%^&*|₩'";:/?()_+<>{}]/gi);

    if (pw == '') {
        document.getElementById('pwCheck').innerHTML = "";
        return false;
    }

    if (pw.length < 8 || pw.length > 20) {
        document.getElementById('pwCheck').innerHTML = '비밀번호는 8~20자로 입력해 주세요.';
        document.getElementById('pwCheck').style.color = 'red';
        return false;
    }
    if (num < 0 | eng < 0 | spe < 0) {
        document.getElementById('pwCheck').innerHTML = '비밀번호에는 숫자, 영문, 특수문자를 포함해 주세요.';
        document.getElementById('pwCheck').style.color = 'red';
        return false;
    }

    if (confirmPW == '') {
        document.getElementById('pwSame').innerHTML = '';
    }

    else if (pw != confirmPW) {
        document.getElementById('pwSame').innerHTML = '비밀번호가 일치하지 않습니다.';
        document.getElementById('pwSame').style.color = 'red';
    }

    else {
        document.getElementById('pwSame').innerHTML = '비밀번호가 일치합니다.';
        document.getElementById('pwSame').style.color = 'blue';
    }


    document.getElementById('pwCheck').innerHTML = '사용할 수 있는 비밀번호입니다.';
    document.getElementById('pwCheck').style.color = 'blue';
    return true;
}