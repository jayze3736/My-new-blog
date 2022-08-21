---
layout: post
title: 일반 type cast 와 as 키워드를 이용한 타입 캐스팅 차이
category: C#
tag: Short-Question
---

# 차이점
간단히 얘기하자면 어떤 오브젝트를 잘못된 타입으로 캐스팅할때 일반적인 방법(ex. (Type)obj)은 예외를 일으키지만, as 키워드를 이용한 방법(ex. obj as Type)은 null을 반환한다고 한다.

# 참고
https://docs.microsoft.com/ko-kr/dotnet/csharp/language-reference/operators/type-testing-and-cast#as-operator

https://stackoverflow.com/questions/3724051/what-is-difference-between-normal-typecasting-and-using-as-keyword
