---
layout: post
title: 'Serialized Property API Wiki'
category: UnityAPI-Wiki
tag: Serialize
---
# SerializedProperty.isExpanded
  

## Usage
현재 SerializedProperty가 클래스 객체나 구조체, 배열등 child property를 가지는 데이터가 inspector에서 필드를 노출시키고 있는지에 대한 여부이다.  
여기서 child property란, 클래스의 경우 필드, 배열의 경우 요소를 의미한다.
인스펙터에서 노출되어있으면 true, 아니면 false를 반환한다.  
더 쉽게 얘기하자면 foldout 라벨(화살표)를 클릭하면 객체의 경우 요소값들을 수정할 수 있는 필드를 보여주는데 이 경우를 Expanded라고 한다.

## 참조
https://docs.unity3d.com/ScriptReference/SerializedProperty-isExpanded.html 

# SerializedProperty.propertyPath
  

## Usage
직렬화된 프로퍼티의 propertyPath 전체를 반환한다.
유니티는 데이터 스트림을 통해 Serialized된 오브젝트를 수정하는 것이 가능한데, 이때 이 직렬화과정에서 프로퍼티를 참조하기위해 사용되는 것이 PropertyPath이다. 
SerializedObject.FindProperty(string propertyPath)에 사용되는 값으로, 해당 경로의 프로퍼티를 반환한다.

## 참조
https://docs.unity3d.com/ScriptReference/SerializedProperty-propertyPath.html   
https://docs.unity.cn/2022.2/Documentation/ScriptReference/Unity.Properties.PropertyPath.html

# SerializedProperty.displayName

## Usage
display 되는 프로퍼티의 이름을 의미한다. Docs에서도 충분한 설명을 제공하지않아서 잘은 모르겠지만 배열이면 "Element #" 이 default값인 것 같다. 

## 참조
https://docs.unity3d.com/ScriptReference/SerializedProperty-displayName.html    