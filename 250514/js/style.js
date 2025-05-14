document.getElementById('signupForm').addEventListener('submit', function (e) {
    //e : event , 웹 브라우저에서 제공해주는 기능 도구. 객체
    e.preventDefault(); // 기본 제출 동작(서버제출) 막기 ( 페이지 리로드 방지)

    // FormData 클래스, 클래스는  변수, 상수, 기능(함수)들의 모음집
    // new FormData() : 클래스를 이용 할려면, 
    // 시동을 걸어야함.  같은 표현
    // 초기화를 함. 프로그래밍적으로 의미
    // 생성자를 호출한다고 함, 최종, 이렇게 표현을 하게 됨. 
    // this : 자기 자신 = document.getElementById('signupForm') 가리킴
    // formData 상수에는, 결론, 여러 기능이 들어 있다.
    // 여기서
    // 유저가 입력한 내용이 FormData 클래스에 담아져있다.
    // 그래서, 우리는 각 요소를 하나씩 꺼내서 사용 중이다.
    const formData = new FormData(this); // 폼 데이터 수집

    // const 상수명 = 값 :  값을 변경이 불가능함. 
    // let 변수명 = 값,   : 값을 변경이 가능함. 
    let output = "" // 결과의 내용을 담을 변수, 초기에는 빈 문자열 초기화.

    // 단일 입력 필드 처리. 
    // 유저명 부터 표기 해보기. 
    // output = output + "내용"
    // output += "내용" ,  같은 의미
    // x = 1
    // x = x + 1 <=> x += 1

    // 백틱 `, `문자열을 표기함` 
    output += `출력되는 유저명 : ${formData.get('username')} \n`
    // 2번째 요소, 패스워드 가져오기
    output += `출력되는 패스워드 :  ${formData.get('password')}\n`

    // 취미, 다중 체크박스 처리(hobby)
    const hobbies = formData.getAll('hobby') // 여러개 요소를 가져와서, 배열에 담기
    output += `출력되는 취미들 : ${hobbies.join(', ')}\n`

    // 성별
    output += `출력되는 성별 :  ${formData.get('gender')}\n`

    // 나이
    output += `출력되는 나이 :  ${formData.get('age')}\n`

    // 생년월일
    output += `출력되는 생년월일 :  ${formData.get('date')}\n`

    // 이메일
    output += `출력되는 이메일 :  ${formData.get('email')}\n`

    // 파일
    const file = formData.get('file')
    output += `출력되는 이메일 :  ${file && file.name ? file.name : '파일없음'}\n`

    output += `출력되는 히든의 요소 :  ${formData.get('user_id')}\n`

    // 결과를 화면에 표기하는 부분 연결
    document.getElementById('output').textContent = output;
})

// 추가 작업, 
// 프로필 이미지 변경 시, 
// 미리보기 화면에 파일 사진 나타내기
document.getElementById('signupForm').file.addEventListener('change',
    function () {
        // 동작원리, 
        // 1) 파일 선택
        // 2) 선택된 파일
        // 3) 폼 양식의 파일에 변경 감지 이벤트 설정
        // 4) 파일 변경 될 떄마다 미리 보기 화면에 이미지 교체를 해줌
        const file = this.files[0]
        if(file && file.type.startsWith('image/')){
            const reader=new FileReader();
            reader.onload=function(e){
                // 이미지 미리보기 영역에 이미지 표시
                document.getElementById('profilePreview').src=e.target.result;
            }
            reader.readAsDataURL(file)
        }
    }
)