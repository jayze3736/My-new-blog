---
layout: post
title: 'SerializedObject란?'
category: Unity-Solution
tag: CustomEditor
---

# 용도
SerilalizedObject는 직렬화된 오브젝트를 의미한다. 직렬화된 오브젝트는 데이터 스트림을 통해 여러개의 필드를 즉시 수정할 수 있게 된다. 유니티의 인스펙터에서 필드값을 수정하는 것 또한 이 객체가 직렬화 될 수 있기때문이고 private나 NonSerialized 속성이 적용된 필드들은 직렬화가 불가능하므로 인스펙터에서 값을 수정할 수 없다.  

# Custom Editor와 연계
데이터를 수정할때 Custom Editor를 이용하여 수정하기도 하는데, 이 커스텀 에디터에서 customEditor 속성을 이용하여 target을 지정하면 해당 target 객체가 serializedObject가 된다.

# Custom Editor와 함께 사용할때 주의점
1. editor에서 참조중인 serializedObject와 실제 원본 serializedObject 둘다 최신화가 되어야하므로  SerializedObject.ApplyModifiedProperties(), SerializedObject.Update() 함수가 호출되어야한다.  
2. SerializedObject.ApplyModifiedProperties(flush 작업)을 호출해야한다. 이 함수는 Editor에서 변경한 serializedObject의 사항을 적용하는 함수이다.
3. SerializedObject.Update는 Editor에서 참조중인 SerializedObject를  업데이트 시키는 작업이다. 만약 현재 참조중인 SerializedObject의 데이터가 원본 데이터보다 한 프레임 느릴경우(Out of date) Update 함수를 통해 SerializedObject를 최신으로 업데이트 시킬 수 있다.