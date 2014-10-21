SimpleDialog
============

간단하고 손쉬운 JavaScript 다이얼로그로 기존 브라우저가 제공하는 다이얼로그(Alert, Confirm)창을 브라우저가 제공하는 모양대신 사용자가 스타일을 정의하여 사용할 수 있습니다.
[데모 페이지](http://devsungsil.github.io/SimpleDialog)

#중요함

## 노트

## 시작하기

SimpleDialog 매우 쉽게 사용할 수 있습니다.

먼저 SimpleDialog 다운로드 합니다. [SimpleDialog 다운로드하기](https://github.com/DevSungsil/SimpleDialog/archive/master.zip)

다운로드를 완료하였으면 헤드 영역에 다음과 같이 HTML 태그를 추가합니다.
```html
<link rel="stylesheet" href="path/to/your/sdialog.css">
```

다음으로 script를 연결해주어야 합니다. 헤드 영역이나 `</body>`태그 이전에 추가 해주어야 합니다.
```html
<script src="path/to/your/sdialog.js"></script>
```

스타일과 스크립트를 연결하였으면 모든 준비가 끝났습니다.

원하는 곳에서 `sdialog()` 메서드를 이용하여 간단하게 다이얼로그 창을 만들어 낼 수 있습니다.

## 사용법

SimpleDialog는 세가지 형태의 사용방식을 지원합니다.

#### 1. 기본 사용법
`sdialog('사용자가 작성하려는 문자열을 입력하면 됩니다.')`

메서드의 파라미터를 하나만 받는 사용법으로 기본으로 정의된 형식을 사용합니다.

#### 2. 사용자 정의를 추가하여 사용
`sdialog('...', options)`

사용자 정의를 추가하여 사용하는 방식으로 다이얼로그 형식을 바꾸는 등의 환경을 설정하여 사용할 수 있습니다.

```js
var options = {
  type:'message',
  bgClick:true,
  ...
}

sdialog('...', options);
```

#### 3. callBack 함수 사용
`sdialog('...', options, callBack())`

confirm 형식의 다이얼로그를 사용시에는 사용자가 콜백함수를 지정하여 사용할 수 있습니다. 이때 콜백함수의 인자로 `true` 또는 `false`의 값을 반환합니다.

```js
var options = {
  type:'confirm',
  bgClick:true,
  ...
}

sdialog('...', options, function(result){
  if(result){
    ...
  }else{
    ...
  }
});
```



## 사용자정의

SimpleDialog는 몇가지의 사용자 정의를 지원합니다.

```js
var options = {
  type:'message',
  bgClick:true,
  ...
}
```

#### type

`Default: 'message'`

사용하는 다이얼로그의 형식을 정의할 수 있습니다.
