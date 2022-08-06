---
layout: post
title: 'Coroutine과 IEnumerator Start에 대해서'
category: C#
tag: Coroutine
---

# Coroutine과 IEnumerator Start에 대해서

## Coroutine 이란
함수는 호출되면 호출된 장소를 스택에 기록해놓고 함수내의 모든 명령문을 처리하고 원래 지점으로 돌아와 다음 명령을 처리한다.  
코루틴이 호출되면 코루틴 내의 명령문을 처리하다가 중단(Pause)을 걸고 빠져나올 수 있으며 제어권을 CPU에게 돌려주어 프레임 업데이트(1 Frame Update)가 이루어지고 다시 되돌아와 중단된 부분부터 다시 처리를 실행한다.  

## Coroutine의 장점
1. 함수의 경우 자신이 해야할 일을 모두 마치기 전까지는 다른 일을 하지못하는 동기적 특징(Synchronous)을 가지고 있지만 코루틴은 자신이 일을 하다가 도중에 다른 일을 할 수 있는 비동기적 특징(Asynchronous)을 가지고 있다. 따라서 처리해야하는 작업이 비동기적이라면 Coroutine을 사용하여 해당 작업을 처리할 수 있다.

2. Unity의 경우 함수가 실행되면 그 함수는 한 프레임(Single Frame)내에 작업이 완료되는데, 함수로 애니메이션이나 프레임단위로 처리가 되어야하는 경우 코루틴을 사용할 수 있다. Update 문을 사용할 수도 있지만 Update 블록 안에서 함수를 호출할 필요없이 코루틴을 호출하기만해도 Update 처럼 프레임단위로 처리가 가능하다.

## 2번 장점이 가능한 이유/원리
Unity는 Start, Awake 등과 같은 초기화 함수 호출이후 Update, FixedUpdate 처럼 프레임단위로 업데이트가 되는 호출함수를 실행한다. 만약 한번 코루틴이 호출이 되어 "yield return null;" 이 호출되면 현재 코루틴 처리를 중단하고 Unity에게 제어권이 넘겨져서 프레임 업데이트가 이루어지고 난 다음 다시 돌아오기때문에 가능하다.


## Coroutine 사용법
- 함수 앞에 반환형을 IEnumerator로 선언해야한다.
- yield return이 반드시 필요하며 해당 명령이 호출되면 코루틴을 중단하고 빠져나와 프레임 업데이트가 이루어진다.
- yield return null, yield return new WaitForSeconds() 등, 중단하는 시기를 조절할 수 있다.

## IEnumerator Start
MonoBehaviour의 생명주기 함수중 Start 의 반환형을 IEnumerator로 바꾸어 Start를 Coroutine으로 선언하는 것이 가능하다.

## Life Cycle에서 IEnumerator Start을 실행하면?
다른 오브젝트들의 Start와 Update가 호출될때 IEnumerator Start가 호출되면 언제 되돌아오는지 실험을 해보자.
먼저 실험을 하기위해 오브젝트 A,B,C를 생성하자.

### A
![](/asset/images/20220803175942.png)

### B
![](/asset/images/20220803180010.png)  

### C
![](/asset/images/20220803180020.png)  

그리고 각각에 Test Script을 추가하자.   



 
### A code
![](/asset/images/20220803182806.png)  

### B code 
![](/asset/images/20220803180116.png)  

### C code
![](/asset/images/20220803180737.png)  
각 코드마다 Start 시작점과 종료점에 Debug 할 수 있도록 log를 출력하도록 했다. 


### 포인트 

- 먼저 A 클래스에서 프리팹 B를 생성하면 B의 Start 함수가 호출되는데 yield return을 만나면 언제 호출되는지 확인해야한다.
- A 클래스 외의 오브젝트 C도 마찬가지로 A의 Start에서 yield return을 만나면 언제 호출되는지 확인하자
- 코루틴 Start가 아닌 일반 코루틴 Count가 호출되면 정말로 1프레임 업데이트가 된후에 되돌아오는지 확인해보자.


## 디버깅

### 1
![](/asset/images/20220803181932.png)  
### 2
![](/asset/images/20220803182148.png)  
### 3
![](/asset/images/20220803182202.png)     
여기서 A의 Start가 중단되고 빠져나간다. 

### 4
![](/asset/images/20220803182235.png)    

사실 A,C는 무관계인 오브젝트이므로 A의 Start를 먼저 실행시킬지 C의 Start를 먼저 실행시킬지 모르지만 여기서는 A의 Start가 먼저 실행되었고 그 다음에 C가 실행되었다.   
중요한 것은 A의 Start가 실행이 다 되기전에 다른 오브젝트의 Start가 실행되었다는 점이다.
### 5
![](/asset/images/20220803182251.png)    
B도 마찬가지로 원래는 A의 Start가 코루틴이 아닌 일반 Start 함수였다면 A의 Start가 종료되고 B의 Start가 실행이되지만 여기서는 A가 중단되어 B의 Start가 실행되는 것을 확인할 수 있다.
### 6
![](/asset/images/20220803182903.png)    
B,C의 모든 Start가 종료되었음에도 불구하고 A의 Start를 재개하지않고 Update를 실행한다. 이 이유는 A에서 yield return이 이루어지므로 1프레임 업데이트가 이루어져야 돌아가기때문이다.
### 7
![](/asset/images/20220803182401.png)  
### 8  
![](/asset/images/20220803182409.png)     
Update가 A - C - B 한 바퀴 돌아갔으므로 이 호출이 끝나면 1프레임 업데이트된다.   


### 9
![](/asset/images/20220803182903.png)
![](/asset/images/20220803182401.png)
![](/asset/images/20220803182409.png)   

7,8,9 즉, Update A,C,B가 다시 반복된다. A에서 중단되었던 작업이 재개될 프레임이지만 동일한 프레임 선상에서 먼저 호출되는 함수는 Update인것같다. 

### 10
![](/asset/images/20220803183552.png)     
마지막으로 되돌아와서 1프레임 업데이트가 이루어지고 난 뒤의 프레임에 작업이 다시 재개된다.


## 여기까지의 결론
1. IEnumerator Start 함수를 사용하여 작업을 중단시키면 모든 오브젝트의 Start가 종료된 후에 실행이된다. 
2. 이때, 초기화 과정에서 생성되는 오브젝트의 Start함수도 포함하여 기다린다.(애초에 프레임 업데이트가 이루어져야 되므로 Update 함수가 1번 실행이 되야 재개된다.)
3. Start가 중단되고 이후의 프레임 업데이트가 이루어진 후에 재개된다. 이때 해당 재개가 우선되어 실행되진 않고 우선순위에 따라 재개된다.


## 추가적인 실험
Count 함수로 일반 코루틴이 1프레임 업데이트 뒤에 되돌아 오는지 확인하자.

### 11
![](/asset/images/20220803182903.png)
### 12
![](/asset/images/20220803183602.png) 


### 13
![](/asset/images/20220803184913.png)    
중단되고 다음 한 프레임을 버린다.

### 14
![](/asset/images/20220803182401.png)
![](/asset/images/20220803182409.png)   
A Update가 이루어진 프레임에서 C,B Update가 호출된다.

### 15
![](/asset/images/20220803182903.png)
![](/asset/images/20220803182401.png)
![](/asset/images/20220803182409.png)   
A의 코루틴은 1프레임 업데이트가 된 뒤에야 재개가 되므로 A, C, B Update가 호출된다.

### 16
![](/asset/images/20220803185222.png)  
마지막으로 되돌아와 작업을 재개한다.


# 결과
![](/asset/images/20220803185251.png)  





