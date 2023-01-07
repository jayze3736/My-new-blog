---
title: 'Quick sort'
category: 알고리즘
tag: 정렬 알고리즘
layout: post
---

# 1. 알고리즘 설명
간단히 얘기해서 배열의 값을 정렬할때 처음 pivot의 위치를 결정하고 pivot 위치 기준으로 두개의 배열로 분할한다. 분할된 부분 배열내에서 다시 정렬을 수행하는 방법이다.
마치 체세포처럼  1/2씩 분열을 되는 모습이다.

# 2. 구현 방법

## pivot
pivot은 정렬이 끝난후 분할되는 기준점을 가리키며 처음에는 배열의 첫 요소를 나타낸다. 

## Partition
1. (부분) 배열의 첫 요소인 pivot을 택하고 pivot을 제외한 나머지 요소에 대해서 대소 비교를 진행한다.
2. i 포인터는 0번지 다음 배열 요소 위치(StartPos + 1)를 가리키며 j 포인터는 배열 끝부분의 마지막 위치(EndPos) 부터 시작한다.
3. 우리가 원하는 모습은 정렬이 완료되었을때 pivot의 왼쪽에는 pivot 보다 작은 값들이 pivot 오른쪽에는 pivot 보다 큰 값들이 위치하는 것이다.  
4. i 포인터는 pivot 보다 큰 값이 존재하는지 확인한다. 만약 현재 i 포인터가 가리키는 값이 pivot 보다 작다면 i포인터를 한칸 오른쪽으로 옮긴다.(i++) 
5. j 포인터는 pivot 보다 작은 값이 존재하는지 확인한다. 만약 현재 j 포인터가 가리키는 값이 pivot 보다 크다면 j 포인터를 한칸 왼쪽으로 옮긴다.(j--)
6. 만약 i 포인터 또는 j 포인터가 증감을 멈췄다면 이는 두 포인터가 가리키는 값의 위치를 바꿔야함을 의미한다. 왜냐하면 i 포인터가 찾아낸 pivot 보다 큰 값은 pivot 기준으로 오른쪽에 위치해야하고 j 포인터가 찾아낸 pivot 보다 큰 값은 pivot 기준으로 왼쪽에 위치해야하기 때문이다.
7. 가장 중요한 것은 종료시점이다. i, j 포인터를 사용하여 값의 위치를 교환하는 작업은 i와 j가 교차할때 종료가 되어야한다. 즉, i값이 증가되고 j값이 감소하여 결국에 i가 j보다 클때 종료가 되어야한다.
8. i가 j 보다 클때 pivot의 위치는 j 포인터의 위치로 결정된다.

## 분할
한번 Partition이 호출되면 j값을 반환받는다.
그리고 j를 기준으로 StartPos 부터 j-1까지, j+1 부터 EndPos까지의 부분 배열에 대해서 QuickSort를 수행한다.


# 3. 실제 구현

코드가 과제할때 구현한 코드라서 일반화가 되어있지는 않지만 대략적으로 다음과 같이 사용한다.

```C++
void Cswap(unsigned char & a, unsigned char & b){
    unsigned char tmp = b;
    b = a;
    a = tmp;


}


int Partition(unsigned char * src, int startPos, int endPos){

    int i = startPos + 1;
    int j = endPos;
    int pivot = src[startPos];

    // i와 j가 동시에 증감이 이루어져도 될까? => no
    // i는 pivot보다 값이 큰 요소를 찾는 포인터이고
    // j는 pivot보다 값이 작은 요소를 찾는 포인터이다.
    // 만약 i를 증감시켰을때 큰 요소를 찾았는데, j가 찾지못했을때 해당 위치로 스왑하는 것은 옳지못함
    // 따라서 i를 증감시켜서 큰 요소를 찾았을때 i의 증감은 멈추고 j를 감소시켜서 j 또한 찾아야함
    // i와 j가 만나는 순간이 파티션 종료 시점


    //만약에 9,1,2,3,4,7,2,8 이렇다면 i가 지속적으로 증가하다가 j를 만난다. 이렇게되면 반복문을빠져나오고, j위치에다가 9를 넣는다.
    //즉, 8위치가 9가되고 9위치에 8이 온다.
    // 마찬가지로 0,1,2,6,4,3,2,1 이렇다면 j가 지속적으로 감소하다가 i를 만난다. 그리고 이렇게되면 반복문을 빠져나오고, j위치인 0번지에 그대로 값을 두면된다.


    while(i <= j){ //마지막까지 교차가 되어야함

        if(pivot >= src[i]){
            i++;
        }
        else if(pivot <= src[j]){
            j--;
        }
        else{ //만약 둘다 증감을 하지않았다면?
            Cswap(src[i], src[j]);
        }

   }

    Cswap(src[startPos], src[j]);
    return j; //다음 파티션의 기준점이됨 j-1, j+1

    //


}




//MedianFiltering을 위한 sorting
void QuickSort(unsigned char * src, int startPos, int endPos){
   //size는 무조건 홀수, 커널의 사이즈가 항상 홀수이기 때문이다.


   //i, j를 이용하여 스왑 대상을 찾음
   //어디서부터 어디까지 정렬을 수행해야하는 range index가 있어야함

   if(startPos >= endPos){
       return;
   }

   int next = Partition(src, startPos, endPos);
   QuickSort(src, startPos, next-1);
   QuickSort(src, next+1, endPos);




}



```

# 참고
https://hongku.tistory.com/149