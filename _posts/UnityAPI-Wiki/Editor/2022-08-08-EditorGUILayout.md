---
layout: post
title: 'EditorGUILayout 관련 API Wiki'
category: UnityAPI-Wiki
tag: Editor
---
Custom Editor를 사용하기위해 Layout을 렌더링할 수 있는 메소드를 제공한다.



# EditorGUILayout.Foldout


## Usage
"Make a label with a foldout arrow to the left of it."  
왼쪽에 접고 필 수 있는 화살표 라벨을 만든다.

## 참조
https://docs.unity3d.com/ScriptReference/EditorGUILayout.Foldout.html  

# EditorUtility.InstanceIDToObject
 
## Usage
"Translates an instance ID to a reference to an object."  
인스턴스 아이디를 입력으로 오브젝트를 찾는다. 유니티 오브젝트들은 각각 고유의 인스턴스 아이디가 존재하므로 아이디값을 알면 해당하는 오브젝트를 찾을 수 있다.

## 참조
https://docs.unity3d.com/ScriptReference/EditorUtility.InstanceIDToObject.html     

# EditorWindow.GetWindow

## Usage
EditorWindow를 반환하고 연다.  

## 참조
https://docs.unity3d.com/ScriptReference/EditorWindow.GetWindow.html

# EditorGUI.indentLevel

## Usage
현재 라인에서 들여쓰기 레벨을 의미한다. indentLevel은 0부터 시작하여 값이 커질수록 들여쓰기되는 부분이 많아진다. label, Foldout과 같은 Text 필드에 대해서만 indent Level이 적용된다. 즉, 버튼과 같은 읽기 전용이 아닌 레이아웃에는 적용이 불가능하다.

## 참조
https://docs.unity3d.com/ScriptReference/EditorGUI-indentLevel.html

# EditorGUILayout.BeginHorizontal()

## Usage
Horizontal Group을 생성한다. BeginHorizontal()을 호출하면 EndHorizontal()을 호출해야하며 이 함수로 Group을 닫는다. BeginHorizontal과 EndHorizontal 사이에 있는 아이템들은 수평방향을 기준으로 레이아웃이 그려진다.

## 참조
https://docs.unity3d.com/ScriptReference/GUILayout.BeginVertical.html  

# EditorGUILayout.BeginVertical()

## Usage
Vertical Group을 생성한다. BeginVertical()을 호출하면 EndVertical()를 호출해야하며 Group을 닫는다. BeginHorizontal과 EndHorizontal 사이에 있는 아이템들은 수직방향을 기준으로 레이아웃이 그려진다.

## Signature
public static void BeginVertical(GUIStyle style, params GUILayoutOption[] options);
다음과 같은 시그니처는    
EditorGUILayout.BeginVertical("box", GUILayout.MaxWidth(150), GUILayout.ExpandHeight(true));    
처럼 사용이 가능하다.   
수직 방향으로 레이아웃을 그리며 box style의 레이아웃으로 최대 width를 150으로 정하며 수직방향으로 높이가 연장되는 것을 허용한다.

## 참조
https://docs.unity3d.com/ScriptReference/GUILayout.BeginVertical.html  

# EditorGUILayout.LabelField()
 
## Usage
라벨을 생성한다. 읽기 전용 필드를 보여준다. 보통 텍스트를 보여줄때만(read-only) 사용하는 레이아웃이다.

## 참조
https://docs.unity3d.com/ScriptReference/EditorGUILayout.LabelField.html 


# EditorGUILayout.PropertyField()

## Usage
직렬화된 Property를 그릴때 사용한다. 

## Signature
시그니처: public static bool PropertyField(SerializedProperty property, bool includeChildren, params GUILayoutOption[] options);  

includeChildren은 child property를 포함해서 그릴껀지에 대한 여부이다. 만약 true가 되면 child property까지 모두 보여주고  
만약 false가 되면 보여주지않는다.

## 참조
https://docs.unity3d.com/ScriptReference/EditorGUILayout.PropertyField.html  



# EditorGUILayout.PrefixLabel()

## Usage
필드 앞에 이름을 붙일때 사용한다. 일반 label과 다르게 필드와 함께 그려지면 필드 앞에 라벨이 붙는다.

## Signature
시그니처: public static void PrefixLabel(string label, GUIStyle followingStyle = "Button");

## 참조
https://docs.unity3d.com/ScriptReference/EditorGUILayout.PrefixLabel.html


# EditorGUILayout.ObjectField()

## Usage
Object Reference를 가지는 필드를 생성한다.

## Signature
public static Object ObjectField(string label, Object obj, Type objType, bool allowSceneObjects, params GUILayoutOption[] options);

label: 필드 앞에 붙는 레이블
obj: 참조될 Object 타입의 변수
objType: 필드 타입, 예를 들어 typeof(Sprite)를 대입하면 Sprite 타입의 필드만을 받을 수 있게된다.
allowSceneObjects: Asset이외에 Scene에 존재하는 오브젝트를 필드에 넣는 것이 가능한지에 대한 여부 

## 메모
obj의 인수 자리에 지역변수를 사용하면 필드 값을 수정할때마다 초기화되거나 사용이 불가능하다. 지역변수는 함수 종료 후 메모리에서 할당을 해제하기 때문에 오브젝트값을 지속적으로 저장하고 수정할 수 있도록 필드 변수를 선언하여 해당 자리에 대입해야한다.

public class CustomClass{
...
public Sprite field;
...

OnGUI(){
    field = EditorGUILayout.ObjectField("field", field, typeof(Sprite));
}

}

여담으로 SerializedProperty는 Type 을 직접 가져오는 방법이 없기때문에 리플렉션을 이용하거나 처음 SerializedProperty를 저장할때 Type을 같이 저장하고 나중에 참조하는 방법으로 ObjectField의 Type objType을 지정해야한다.

## 참조
https://docs.unity3d.com/ScriptReference/EditorGUILayout.ObjectField.html


