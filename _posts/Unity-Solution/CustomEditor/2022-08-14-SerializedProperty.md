---
layout: post
title: 'SerializedProperty란?'
category: Unity-Solution
tag: CustomEditor
---

# SerializedProperty란?
SerializedProperty는 SerializedObject의 직렬화된 필드를 의미한다. 예를 들어서, 어떤 오브젝트가 int 타입 변수, 제네릭 타입 객체를 필드로 가지고 있을때 오브젝트가 직렬화되면 int 타입 변수와 제네릭 객체도 직렬화된 프로퍼티로 변환되어 SerializedObject에 저장된다.

# 용도
일반적으로 Custom editor나 Custom inspector에서 필드값을  바꾸기 위해 사용한다. SerializedObject의 멤버 함수 FindProperty()를 사용하여 찾고자하는 SerializedProperty를 반환받고, 이 프로퍼티의 값을 수정한다.

# SerializedObject.FindProperty()
public SerializedProperty FindProperty(string propertyPath);
이 함수를 통해 찾고자하는 프로퍼티를 반환 받고 값을 수정한다. 이때 인수 이름이 propertyPath인데, 직렬화된 오브젝트에서 프로퍼티를 찾기위한 고유의 string 값을 의미한다.   
예를 들면,
target 오브젝트의 필드가 int id; 일때, serializedObject.FindProperty("id"); 을 호출하면 id에 대한 SerializedProperty 값을 받을 수 있고 이때 id에 대한 property path는 "id"이다.

참조: https://docs.unity3d.com/ScriptReference/SerializedObject.FindProperty.html

# 직렬화시 주의 사항
오브젝트를 직렬화하면 그 오브젝트의 모든 프로퍼티가 직렬화되지않는다. 타입에 따라서, 속성에 따라서 직렬화 가능 여부가 결정된다.

# 직렬화 제약조건
+ is public, or have [SerializeField] attribute
+ static이 아님
+ const이 아님
+ readonly이 아님
+ has fieldtype that is of a type that can be serialized (See below.)
  
## Fieldtypes that can be serialized
+ Custom non abstract classes with [Serializable] attribute.
+ Custom structs with [Serializable] attribute. (Added in Unity 4.5.)
+ References to GameObjects that derive from UnityEngine.Object.
+ Primitive data types (int, float, double, bool, string, etc.).
+ Array of a fieldtype that can be serialized.
+ List<T> of a fieldtype that can be serialized.

## 정리
1. public 선언 또는 SerilalizedField 속성으로 지정된 필드여야 직렬화 가능
2. static이 아니어야함
3. const가 아니어야함
4. readonly가 아니어야함 
5. 추상 클래스가 아니고 Serializable 속성으로 지정된 사용자 지정 클래스여야 직렬화 가능
6. Serializable 속성으로 지정된 사용자 지정 구조체도 가능
7. UnityEngine.Object을 상속받는 클래스 객체 직렬화 가능
8. 원시형 데이터 타입 직렬화 가능
9. Array 타입 가능(ex. int [] arr, T [] arr)
10. 제네릭 List 타입 가능

여기서 반드시 지켜야하는 점은
+ 필드가 public 또는 SerializedField로 선언되어야 해당 필드의 직렬화가 가능하고
+ 직렬화 하려는 오브젝트의 클래스에는 Serializable 속성이 존재해야한다는 점이다.

따라서 위의 조건을 지키지않은 필드나 클래스 객체는 직렬화가 불가능하며 Inspector에서 값을 변경하는 작업을 수행하지 못한다.


# PropertyPath
SerializedProperty는 제각각 PropertyPath라는 것이 존재한다. 이 경로를 통해 데이터 스트림에서 해당 프로퍼티의 값을 가져와서 수정할 수 있다.  
프로퍼티의 타입은 string이며 seperator는 '.'이다. 일반적으로 target 오브젝트의 필드들은 변수명과 propertyPath가 일치하기때문에 구별이 쉽다.
그러나 필드 타입이 제네릭 리스트일 경우(List< T >) ".Array"가 붙는다.

예를 들어, 필드가 List< T > list일 경우   
T가 Primitive Type일때   
SerializedProperty: list 일 경우 경로는 "list"   
SerializedProperty: list[0] 일 경우 경로는 "list.Array.data[0]"   

T가 Reference Type일때   
클래스 내에 "id"라는 멤버를 포함하고 있을때   
SerializedProperty가 list일 경우 경로는 "list"  
SerializedProperty가 list[0]일 경우 경로는 "list.array.data.list[0]"   
SerializedProperty가 list[0].field일 경우 경로는 "list.array.data.list[0].id"   


# PropertyType
SerializedProperty 클래스에는 PropertyType이라는 필드가 있는데 이 프로퍼티는 Enum이며 현재 이 프로퍼티가 어떤 타입인지에 대한 정보를 나타낸다. 

예를 들어, 
프로퍼티가 string 타입이면 SerializedPropertyType.String이다.  
GameObject와 같은 클래스인경우 SerializedPropertyType.Object이다.  
array, list, struct인 경우 SerializedPropertyType.Generic이다.

참조: https://docs.unity3d.com/ScriptReference/SerializedPropertyType.html


# type
PropertyType과 다르게 C# 타입의 이름을 나타내며 string 값을 반환하는 프로퍼티이다.   
이때 반환하는 타입 이름을 이름 그대로 반환하지않고 특수기호가 붙은 문자열을 반환된다.
예를 들어 GameObject 클래스의 프로퍼티일 경우 type은
"PPtr<$GameObject>"의 문자열을 반환한다.


# SerializedProperty의 Value 프로퍼티
직렬화된 SerializedProperty를 SerializedObject로부터 찾아냈다면 이 값을 수정하기위해선 이 프로퍼티 타입에 맞는 Value 프로퍼티를 사용하면된다.  

colorValue, doubleValue, vector3Value, boolValue 등등 SerializedProperty의 실제 필드 값을 바꿀 수 있는 프로퍼티를 제공한다.   
이때 개발자는 타입을 미리 알고있어야하며 만약 SerializedProperty의 필드와 다른 타입의 프로퍼티를 사용할 경우 Null 예외가 발생한다.

이 프로퍼티들 중에 SerializedProperty.objectReferenceValue으로 MonoBehaviour를 상속받는 오브젝트에 대한 참조값을 수정할 수 있다.

# Generic Property와 Child Property
SerializedProperty가 list, array, struct 또는 class일때 Generic Property라고 하며 엘리먼트 요소를 child property라고 한다.

# foreach와 Generic Property 사용시 주의사항
prop이 Generic property일때 foreach(SerializedProprerty p in prop) 처럼 Generic Property를 foreach문과 함께 사용하여 child property를 하나씩 반환받아 처리할 수 있다.  
이때 foreach를 사용할때 SerializedProperty에 있는 Enumerator를 반환받아 Enumerator의 iterator를 한칸씩 움직이면서 해당 위치의 요소를 반환받는데, 만약 조사하려는 property의 타입이 제네릭 리스트의 요소일 경우 요소의 필드를 모두 조사한 후 iterator 위치가 제네릭 리스트의 다음 요소로 옮겨지기때문에 Property의 값이 바뀌게 된다.

예를 들어서, List< CustomClass > list라는 SerializedProperty가 존재하고 이 프로퍼티의 list[ 0 ]을 다음과 같이 참조시키면  

SerializedProperty prop = list[ 0 ]  
foreach(SerializedProperty p in prop)  

prop에 저장된 필드의 SerializedProperty가 p에 하나씩 반환이되면서 list[ 0 ]의 iterator를 움직이고 foreach의 마지막 루프에서 iterator가 list[ 1 ]로 이동되기때문에 p는 list[ 0 ]가 아니라 list[ 1 ]의 값을 가지게 된다.  

따라서 이 iterator의 위치를 변경하지 않으려면 처음 받은 SerializedProperty의 propertyPath를 기억했다가 반복 후에 다시 바인딩을 하던가 아니면 Copy 함수를 사용하여 사본 SerializedProperty를 받아서 이 프로퍼티의 iterator를 반복하던가 해야한다.

참조:   
GetEnumerator: https://docs.unity3d.com/2022.1/Documentation/ScriptReference/SerializedProperty.GetEnumerator.html

Copy:   
https://docs.unity3d.com/2022.1/Documentation/ScriptReference/SerializedProperty.Copy.html

IEnumerator:   
https://docs.microsoft.com/ko-kr/dotnet/api/system.collections.ienumerator?view=net-6.0


# DeleteElement와 InsertElement 그리고 GetElement
SerializedProperty가 array 또는 list일때 요소를 위치에 추가하거나 삭제하거나 반환받을 수 있는 함수가 있다.

DeleteArrayElementAtIndex(int index): 해당 인덱스 위치의 요소 삭제
GetArrayElementAtIndex(int index): 해당 인덱스 위치의 요소 반환
InsertArrayElementAtIndex(int index): 해당 인덱스 위치의 요소 추가

문제는 array 또는 list property를 참조할 가능성이 존재하는 상황에서 요소를 삭제하거나 추가하면 에러가 발생할 수 있으므로 주의해야한다.

삭제또는 추가한 후 OnGUI의 진행을 초기화하고 다시 시작할 수 있도록 return을 걸어준다던지, list 프로퍼티를 참조하는 코드가 삭제 추가 이후에 실행되도록 만든다던지의 방안을 생각할 수 있다.


# Cached SerializedProperty(프로퍼티를 캐쉬하는 경우)
SerializedProperty를 클래스의 필드로 선언하고 캐쉬하는 경우에 주의해야할 점이 있다.
캐쉬하고 있는 SerailizedProperty가 삭제될 경우 문제가 발생할 수 있다.  
DeleteArrayElementAtIndex 처럼 직렬화 프로퍼티를 삭제하는 함수가 실행되면 삭제된 프로퍼티를 선언한 SerializedProperty 필드가 캐쉬하고있기 때문에 메모리에 제거되지않고 해당 프로퍼티를 사용할 가능성이 있기때문에 발생한다. 따라서 이러한 경우에는 삭제후에 해당 필드를 null로 바꾸는 등의 초기화 작업이 필요하다.

