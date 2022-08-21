---
layout: post
title: 'GUILayout 관련 API Wiki'
category: UnityAPI-Wiki
tag: Editor
---
너비, 높이 각종 레이아웃의 세부정보를 수정할 수 있는 메소드를 제공한다.


# GUILayout.ExpandHeight()

## Usage
Layout의 옵션중 하나이며, 현재 그려지는 Layout의 Height를 최대로 늘릴지에 대한 설정 여부이다. 해당 함수의 인자를 true로 호출하면 최대로 늘려지고, false로 호출하면 늘려지지않는다.

## 참조
<https://docs.unity3d.com/ScriptReference/GUILayout.ExpandHeight.html>   

# GUILayout.MaxWidth()
## Usage
최대 너비를 설정한다.

## 참조
<https://docs.unity3d.com/ScriptReference/GUILayout.MaxWidth.html>  

# GUILayout.Space()
## Usage
공백을 주기 위해 사용한다. EditorGUI.indentLevel은 읽기 전용 레이아웃에만 적용이 가능하나, Space는 버튼, Text 필드와 같은 읽기 전용이 아닌 레이아웃 사이에 공백을 줄 수 있다.  

BeginHorizontalGroup() 이 호출된 후 Space가 호출되면 수평 방향으로 공백이 생기며 BeginVerticalGroup()이 호출된 후 Space가 호출되면 수직 방향으로 공백이 생긴다.


## 참조
<https://docs.unity3d.com/ScriptReference/GUILayout.Space.html>
