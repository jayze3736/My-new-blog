---
layout: post
title: 'Matlab wiki'
category: Note
tag: Matlab
---

# 전체 주석 처리 / 해제
ctrl + R: 전체 주석 처리  
ctrl + T: 전체 주석 해제

# 플롯 - 그리드

### 그리드 활성화
grid on

### 그리드 너비 조정
xticks(0:0.2:1)  
yticks([0 0.5 0.8 1])

# 플롯 - 타이틀

### 타이틀 

title('Line Plot of Sine and Cosine Between -2\pi and 2\pi')    

<https://kr.mathworks.com/help/matlab/ref/title.html>

### 폰트 사이즈
title.FontSize

### 범례
legend(string)

### 참조
<https://kr.mathworks.com/help/matlab/creating_plots/add-title-axis-labels-and-legend-to-graph.html>


# 변환 함수

## rad to deg(각도)
rad2deg(R)

## int to string(문자열)
int2str(R)
