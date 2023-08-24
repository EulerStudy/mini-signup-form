// 1. autofocus 구현
const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
window.addEventListener('load', () => { $id.focus() })

// 2. 유효성 검사 로직 구현
const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const ERROR_MSG = {
  required: '필수 정보입니다.',
  invalidId: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
  invalidPw: '8~16자 영문 대소문자, 숫자를 사용하세요.',
  invalidPwCheck: '비밀번호가 일치하지 않습니다.',
}

// 3. 커스텀 에러 메시지
const checkRegex = (target) => {
  const { value, id } = target
  console.log(value, id)
  if (value.length == 0)
    return 'required'
  else {
    switch (id) {
      case 'id':
        return ID_REGEX.test(value) ? true : 'invalidId'
      case 'pw':
        return PW_REGEX.test(value) ? true : 'invalidPw'
      case 'pw-check':
        return $pw.value === value ? true : 'invalidPwCheck'
    }
  }
}

const checkValidation = (target, msgTarget) => {
  const isValid = checkRegex(target)
  if (isValid !== true) {
    target.classList.add('border-red-600')
    msgTarget.innerText = ERROR_MSG[isValid]
  } else {
    target.classList.remove('border-red-600')
    msgTarget.innerText = ''
  }
  return isValid
}

$id.addEventListener('focusout', (e) => checkValidation($id, $idMsg))
$pw.addEventListener('focusout', (e) => checkValidation($pw, $pwMsg))
$pwCheck.addEventListener('focusout', (e) => checkValidation($pwCheck, $pwCheckMsg))

// 4. 입력 확인 모달 창 구현
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')
const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw') 

$submit.addEventListener('click', (e) => {
  e.preventDefault()
  const isValidForm = 
  checkValidation($id, $idMsg) === true &&
  checkValidation($pw, $pwMsg) === true &&
  checkValidation($pwCheck, $pwCheckMsg) === true

  if (isValidForm === true) {
    $confirmId.innerText = $id.value
    $confirmPw.innerText = $pw.value
    $modal.showModal()
  }
})

const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

$cancelBtn.addEventListener('click', () => {
  $modal.close()
})

$approveBtn.addEventListener('click', () => {
  window.alert('가입되었습니다. 😊')
  $modal.close()
})

// 5. 폰트 사이즈 조절 버튼
const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const $html = document.documentElement
const getHtmlFont = () => {
  return parseFloat(window.getComputedStyle($html).fontSize)
}

$increaseFontBtn.addEventListener('click', () => {
  onClickFontSizeControl('increase')
})

$decreaseFontBtn.addEventListener('click', () => {
  onClickFontSizeControl('decrease')
})

const onClickFontSizeControl = (flag) => {
  const fontSize = getHtmlFont()
  const newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
  
  $html.style.fontSize = newFontSize
  $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE ? true : false
  $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE ? true : false
}