---
layout: post
title: 'Get type from FieldInfo'
category: C#
tag: Reflection
---
이 포스트는 리플렉션을 이용하여 Field의 타입을 가져오는 방법을 소개한다.  

# 타입 먼저 가져오기
C#에 정의된 Object를 상속받는 모든 오브젝트들은 기본적으로 GetType() 함수를 통해 자신의 Type을 반환할 수 있다. 따라서 타입을 가져오기위해서는 GetType() 함수를 호출해야한다. 

ex)
GameObject obj;  
Type t = obj.GetType();  

참조:   
<https://docs.microsoft.com/en-us/dotnet/api/system.object.gettype?view=net-6.0>

# 타입에서 FieldInfo 가져오기
Type에 정의된 GetField 또는 GetFields를 이용하여 FieldInfo를 가져올 수 있다.

## Type.GetField
Type.GetField에는 두가지 시그니처가 존재한다.

1. GetField(string name)
2. GetField(string name, BindingFlags flags)

1번은 해당 타입의 선언된 필드중 name의 필드명을 가진 FieldInfo를 반환한다.
2번은 name의 필드명을 가진 FieldInfo를 반환하되, BindingFlags를 세팅하여 찾고자하는 필드의 속성을 필터링할 수 있다.

참조: 
<https://docs.microsoft.com/ko-kr/dotnet/api/system.reflection.fieldinfo?view=net-6.0>

# BindingFlags
BindingFlags는 public, nonpublic, static 등 찾고자 하는 필드의 세부사항을 지정하는 플래그를 의미한다.  
이 중에서도 중요한 Enum은  
+ BindingFlags.NonPublic  
+ BindingFlags.Public  
+ BindingFlags.Instance  
이 세가지이다.  
BindingFlags.NonPublic은 public이 아닌 필드를 탐색 범위에 넣는 플래그이다.
BindingFlags.Public은 public인 필드를 탐색 범위에 넣는 플래그이다.
BindingFlags.Instance는 인스턴스 멤버를 탐색 범위에 넣는 플래그이다.


참조:
1. <https://docs.microsoft.com/ko-kr/dotnet/api/system.reflection.bindingflags?view=net-6.0>
2. <https://stackoverflow.com/questions/95910/find-a-private-field-with-reflection>

# Instance Member?
클래스를 선언하고 객체를 생성하면 그 객체를 Instance라고 한다. Instance Member는 생성한 객체에서 메모리에 독립적으로 할당된 멤버를 의미한다. 반면, static member의 경우 객체들 끼리 이 전역 멤버값을 공유하기때문에 인스턴스 멤버라고 볼 수 없다.

# Type detect(or 구별하기) 
찾은 타입이 어떤 타입인지 구별해야할 때가 있다. 예를 들어서 내가 참조하고 있는 FieldInfo의 타입이 List< T > 일때 처리해야하는 코드가 존재하면 해당 FieldInfo가 List < T > 임을 알아내야한다.

## Type.isArray
헷갈릴 만한 멤버이다. List< T >나 Queue 등 자료구조와는 무관하며 오로지 현재 타입이 배열인지 아닌지 판별하는 bool 프로퍼티이다.

예를 들어, int [] intarr 또는 GameObject [] objarr는 Type.isArray가 true이지만, 
List< int > intlist는 Type.isArray가 false이다.

참조:  
<https://docs.microsoft.com/en-us/dotnet/api/system.type.isarray?view=net-6.0#system-type-isarray>

## Type.IsAssignable(Type type)
type이라는 인자를 Type을 가진 변수에 넣을 수 있는지에 대한 bool 값을 반환한다.  
보통은 위 함수를 다음과 같이 사용할 수 있다.  
typeof(IEnumerable).IsAssignable(type);  
Type 객체인 type을 IEnumerable 변수에 넣을 수 있는지에 대한 여부이다.   
List< T >, Queue 등 반복이 가능한 자료구조들은 IEnumerable을 상속받기때문에 IEnumerable 라는 인터페이스 타입 변수에 넣을 수 있는지 bool 값을 반환한다.  
헷갈리면 안되는 점은 추상 클래스, 인터페이스는 객체를 생성할 수 없지만 어떤 클래스가 그 추상 클래스 또는 인터페이스를 상속받는 경우 업캐스팅하여 변수에 저장할 수 있다.

참조: 
1. <https://stackoverflow.com/questions/4115968/how-to-tell-whether-a-type-is-a-list-or-array-or-ienumerable-or>
2. <https://docs.microsoft.com/en-us/dotnet/api/system.type.isassignablefrom?view=net-6.0>

# FieldInfo.GetType vs FieldInfo.FieldType
FieldInfo.GetType과 FieldInfo.FieldType은 둘다 Type을 반환하지만 서로 다른 Type을 반환한다. GetType은 FieldInfo라는 객체의 타입을 반환하지만 FieldInfo.FieldType은 FieldInfo 안에 있는 필드의 타입을 반환한다.  
따라서 정확한 필드의 타입을 가져오기위해서는 FieldInfo.FieldType이 올바르다.

참조: 
1. <https://stackoverflow.com/questions/35540785/get-type-of-a-field-of-class>
2. <https://forum.unity.com/threads/issues-with-reflection-monofield-object.51307/>
3. <https://docs.microsoft.com/en-us/dotnet/api/system.reflection.fieldinfo.fieldtype?redirectedfrom=MSDN&view=net-6.0#System_Reflection_FieldInfo_FieldType>

# List< T >의 요소 Type 가져오기
Type.GetGenericArguments()는 제네릭 타입의 인수를 가져온다. 예를 들어,
List< Sprite >는 타입 선언시 사용한 인수가 Sprite이고 한개이다.
CustomClass< Text, Sprite > 처럼 두개의 타입을 인수로 받는 제네릭 클래스는 인수가 두개이며 Text, Sprite이다. 이 처럼 클래스 선언시 필요한 타입 또는 인수를 반환하는 함수를 Type.GetGenericArguments()라고 한다.

이 함수는 Type [] 를 반환하는데, List< T >의 경우 인자가 한개이므로 반환하는 Type 배열의 0번째에 T의 타입이 위치하게된다.
따라서 Type.GetGenericArguments()[ 0 ]를 호출하면 T를 반환받을 수 있다.


참조: 
<https://docs.microsoft.com/en-us/dotnet/api/system.type.getgenericarguments?redirectedfrom=MSDN&view=net-6.0#System_Type_GetGenericArguments>

## 주의할점
Type.GetElementType()은 배열에만 적용되는 함수이므로 제네릭 리스트에는 사용할 수 없다.

참조: 
1. <https://docs.microsoft.com/ko-kr/dotnet/api/system.type.getelementtype?view=net-6.0>
2. <https://stackoverflow.com/questions/4913491/confusing-result-of-getelementtype-on-arrays-and-generic-lists>