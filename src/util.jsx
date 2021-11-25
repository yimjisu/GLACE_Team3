export function checkPwd(p1, p2) {
    if (p1 != p2) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

    const pw = p1;
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/ig);
    const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20){
        alert("비밀번호는 8~20자리로 입력해주세요.");
        return false;
       }
    if (pw.search(/\s/) != -1){
        alert("비밀번호는 공백 없이 입력해주세요.");
        return false;
    }
    if (num < 0) {
        alert("비밀번호에 숫자를 포함해주세요.");
        return false;
    }
    if (eng < 0) {
        alert("비밀번호에 영문을 포함해주세요.");
        return false;
    }
    if (spe < 0) {
        alert("비밀번호에 특수문자를 포함해주세요.");
        return false;
    }

    return true;
}

export function checkPhoneNumber(phoneNumber) {
    if (/^010[0-9]{8}$/.test(phoneNumber)) {
        return true;
    }
    
    alert('유효하지 않는 휴대폰 번호입니다.');
    return false;
}