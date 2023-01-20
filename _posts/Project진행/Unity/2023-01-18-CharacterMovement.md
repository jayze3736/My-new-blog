---
layout: post
title: '자연스러운 캐릭터의 이동 구현'
category: Unity 
tag: Dev
---

# 캐릭터의 이동 방법
오늘 소개할 것은 2D Platformer의 캐릭터 이동 구현 방법이다. 2D Platformer의 경우 2차원 평면상에서의 이동만 필요하므로 x,y 방향의 조작만 구현하면 된다.

총 5가지의 버전으로 이동을 구현해 봤다.

+ Pos Mode
+ Force Mode
+ Complicated Force Mode
+ Complicated Force Mode 2
+ Impulse 
+ Jump

![](/asset/images/20230118130912.png)  

# 1. Pos mode
pos mode는 트랜스폼의 각 프레임 업데이트 마다 position값을 직접 더하여 캐릭터의 위치를 변화하는 방법을 의미한다.

![](/asset/images/20230118115918.png)  


# 2. Force mode
pos mode의 경우 트랜스폼의 값을 직접 대입하여 수정하기 때문에 캐릭터가 순간이동하는 듯한 퍼포먼스상의 괴리감이 들 수 있다. 즉, Pos mode의 경우 캐릭터 이동이 어색할 수 있다. 따라서 힘을 사용하여 엔진에서의 물리적 연산을 통해 캐릭터의 부드러운 이동을 구현할 수 있다.

![](/asset/images/20230118120126.png)  

간단하게 힘값을 그 방향으로 줘서 캐릭터를 움직여봤다. 하지만 조작을 멈췄을때 미끄러지는 듯한(Slippy) 조작감을 느낄 수 있다. 따라서 조작에 있어서 디테일을 구현하기 위해서 다음 영상을 참고하여 코드를 작성했다.

<https://www.youtube.com/watch?v=KbtcEVCM7bw&list=LL&index=9&t=157s>

# 3. Complicated Force Mode
해당 영상에서 제시하는 포인트는 다음과 같다.


## 1. Lerp
![](/asset/images/20230118121744.png)  
최대 속도값을 정해놓고 현재 속도와 최대 속도의 사잇값을 선형 보간(Interpolate)하여 목표 속도를 구한다.
lerpAmount 값이 클수록 프레임당 더 빠르게 이동할 것이다. Lerp를 사용하는 이유는 정지 상태(속도 0)에서 한 프레임에 현재 속도가 목표 속도값으로 업데이트되면 너무 빠르게 이동할 가능성이 있으므로 선형 보간으로 목표 속도값을 실제 목표 속도값보다 낮춰서 지정한다.


## 2. SpeedDif
![](/asset/images/20230118121953.png)  
캐릭터가 움직일 경우 runAccelAmount(가속) 만큼 accelRate을 정하고 어떠한 조작이 없을 경우 runDeccelAmount(감속) 만큼 accelRate을 정한다. 
![](/asset/images/20230118122007.png) 
목표 속도와 현재 속도의 차이인 speedDif를 구한다음 해당 속도에 accelRate을 곱하여 힘을 가한다. 목표 속도에 가까워질 수록 SpeedDif값은 0에 수렴하며 점차 가해지는 힘이 줄어든다.  

speedDif의 그래프를 그려본다면 다음과 같다.
![](/asset/images/20230118122813.png)  
   
## 3. Remove slippy effect
![](/asset/images/20230118122920.png)  

마찰력을 주어 힘 사용시 미끄러지는 듯한 효과를 제거한다. 어떠한 조작키도 누르지 않았다면 dir == 0이 True가 되며 이 경우에 현재 진행중인 속도의 반대방향으로 힘을 가해준다.


# 4. Complicated Force Mode v2
영상에서 제시한 코드와 깃허브에서 보여준 코드가 달랐기에 movement 변수를 지정하는 방법을 모두 실행했다.

첫번째 Complicated Force Mode는 speedDif에 accelRate을 곱하여 힘값을 결정한다면, 두번째 Complicated Force Mode는 지수 함수를 이용하여 힘값을 결정한다.

# 5. Impulse Mode
유니티에서 제공하는 ForceMode2D에는 총 네가지 모드가 존재한다. 그 중에서 자주 사용되는 모드는 Force Mode와 Impulse Mode이다. Force Mode는 여러 프레임에 걸쳐서 힘을 작용할때 사용하며 Impulse Mode는 짧은 시간동안 힘을 작용할때 주로 사용한다.

즉, 점진적으로 물리량을 변화시킬때는 Force Mode, 급격하게 물리량을 변화시킬때는 Impulse Mode를 사용하면 된다.

# 6. Jump
![](/asset/images/20230118130421.png)  
점프의 경우 기본적으로 y 방향의 힘을 작용하되 점프 입력키를 누르는 시간이 대부분 짧기때문에 Impulse Mode로 힘을 가한다.

# 7. Coyote time

# 8. Jump cut

# 9. Full Gravity


