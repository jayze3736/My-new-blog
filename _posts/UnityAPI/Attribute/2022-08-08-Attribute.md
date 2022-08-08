---
layout: post
title: 'Attribute API'
category: UnityAPI
tag: Attribute
---

# OnOpenAssetAttribute 


## Usage
(e.g the callback is fired when double clicking an asset in the Project Browser)  

클래스 내의 메소드 상단에 [ OnOpenAsset() ] 이라는 속성을 지정하면 해당 스크립트가 부착된 오브젝트를 여는 이벤트가 처리될때 해당 메소드를 실행할 수 있다.  
속성의 파라메터에는 int값이 들어갈 수 있으며 같은 스크립트내에서 에셋을 여는 이벤트 발생시 호출될 순서를 정할 수 있다.  

## 주의
static bool OnOpenAsset(int instanceID, int line)    
static bool OnOpenAsset(int instanceID, int line, int column)    
단, 해당 속성으로 지정한 메소드는 다음과 같은 시그니처로 정의되어야한다.

## 참조
https://docs.unity3d.com/2020.1/Documentation/ScriptReference/Callbacks.OnOpenAssetAttribute.html 


# TextAreaAttribute


## Usage
인스펙터에서 보여지는 string 필드의 라인을 조정할 수 있다. 기본적으로 인스펙터에서는 1줄이고 좌우로 문자열을 넘겨서 볼 수 있지만, TextArea는 몇줄까지 보여줄지 정할 수 있어 한눈에 문자열을 보기가 편하다. 보통 문장이나 긴 문자열 필드를 저장하고 수정해야할때 용이하다.

[ TextArea(int minline, int maxline) ]  
string var  

minline은 보여질 최소 문자 줄 수를 의미하고 maxline은 보여질 최대 문자 줄 수 를 의미한다.

## 참조
https://docs.unity3d.com/ScriptReference/TextAreaAttribute.html