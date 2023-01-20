---
layout: post
title: 'Trajectory'
category: Unity
tag: Dev
---

점을 움직여야하는 객체가 존재할때 이 점의 이동경로를 전부 애니메이션으로 구현하는 것은
어려울 것이다.
따라서 점의 이동경로를 씬상에서 편집할 수 있게 하고 이 궤적을 시각화할 수 있는
툴을 제작하려고한다.

# 호 그리기

점이 원의 궤적을 그리면서 이동할때 시작점과 종점까지 이동한 궤적을 시각화한다.

![](/asset/gifs/gArc.gif)

첫번째 궤적은 시작점을 가리키고 두번째 궤적은 종점을 가리킨다. space를 눌러 궤적의 움직임을 멈춘 후 두번째 space를 눌렀을때 두 궤적을 잇는 호를 그린다.

각 궤적은 캐릭터의 공격 컨트롤에 사용된다.

(포인트) 
1. 두 궤적을 잇기위해서는 시작점의 각도값과 종점의 각도값이 필요하다. 두 각도값의 차이만큼 시작 위치부터 각도값을 조금씩 증가시키며 호의 점 위치를 구해야한다.

2. 두 각도값의 차이를 resolution만큼 나눈 미소 각도값 만큼 더하면서 점 위치를 구한다.

3. 현재 두 궤적의 각도값이 음의 각도인지 양의 각도인지 파악해야한다. Atan2의 경우 -180도 부터 180도의 값을 반환하기 때문에 0도에서 360도 기준으로 계산을 할지, 음의 각도를 포함하여 계산을 할지 결정해야한다. 이 경우에는 직관성을 위해 0에서 360도의 범위로 만들어 값을 계산한다. 해당 범위로 만들어주는 정규화 함수는 NormalizeAngle()이다.

   


4. 두 궤적을 잇는 경로는 두가지가 존재한다. 최단 경로가 있고 최장 경로가 있다. 두 궤적이 존재할때 두 궤적의 각도차이가 180도 미만이면 시작점에서 시계방향으로 미소 각도를 더하여 종점까지 호를 그린다.

5.  두 궤적의 각도차가 180도 이상이 되면 최단 경로를 선택하기 위하여 반시계 방향으로 미소 각도를 빼서 종점까지 호를 그려야한다. 


''' C# 

    public ArcData GetArcData2D(Vector2 startPos, Vector2 center, Vector2 endPos)
    {



        // 시작 지점과 끝지점을 알고있음 -> startPos, endPos의 각도를 알아야함
        // 원의 중심과 반지름을 알고있음


        // 시작점과 끝점의 방향 벡터를 구함
        Vector2 sDir = (startPos - center).normalized; // 시작 위치의 방향 벡터
        Vector2 eDir = (endPos - center).normalized; // 끝 위치의 방향 벡터


        // 방향벡터로부터 시작 각도값과 끝점 각도값을 구함
        float startAng = Mathf.Atan2(sDir.y, sDir.x) * Constant.RAD2DEG; // center를 기준으로 startPos가 가리키는 방향 벡터의 각도 [rad], 범위는 -180 ~ 180도 까지
        float endAng = Mathf.Atan2(eDir.y, eDir.x) * Constant.RAD2DEG; // center를 기준으로 EndPos가 가리키는 방향 벡터의 각도 [rad]


        // 직관성을 위해 각도 범위를 0에서 360도로 변경
        startAng = Constant.NormalizeDegree(startAng);
        endAng = Constant.NormalizeDegree(endAng);




        // x = r * cos(theta) 고 y =  r * sin(theta) 임



        // startAng이 무조건 endAng보다 작다고 보장 못함
        // 따라서 startAng이 endAng보다 크면 바꿔준다.
        // startAng은 각도가 작은 값을 의미한다. endAng은 각도가 큰 값을 의미한다.
        if (startAng > endAng)
        {
            
            float tmp = startAng;
            startAng = endAng;
            endAng = tmp; 


        }



        // 2. 각도가 큰 것에서 작은 것은 뺀다. 해당 결과값은 각도가 작은 지점서부터 큰 지점까지 증가해야할 총 변위각을 의미한다.
        float diff = endAng - startAng; //[deg], diff is larger than 0
        Vector3[] points;
        int size;


        // 두 지점을 잇는 경로 중에 가장 짧은쪽을 택해야함 
        // 둘의 각도 차이가 180도 이상 차이가 나면 반시계방향으로 돌아야하고 아니면 시계방향으로 돌아야함
        if (diff > 180.0f) // 반시계 방향으로 더함, 둘의 각도 차이가 180도 이상일때 무조건 StartAng은 음의 각도, endAng은 양의 각도
        {
            
            diff = 360.0f - diff;
            // resolution은 diff를 등분한 개수로, 등분한 개수만큼 배열이 생성되어야함
            points = new Vector3[resolution];
            int i = 0;

            for (float theta = startAng; theta > (int)(startAng - diff); theta -= (diff / resolution))
            {

                float x = center.x + radius * Mathf.Cos(theta * Constant.DEG2RAD); // 호의 자취의 x 좌표
                float y = center.y + radius * Mathf.Sin(theta * Constant.DEG2RAD); // 호의 자취의 y 좌표
                Vector3 point = new Vector3(x, y, 0);

                //Debug.Log(diff);
                //Debug.Log(resolution);
                //Debug.Log("CCW" + (diff / resolution));
                points[i] = point;
                
                i++;

            }

            //최종적으로 for문이 반복된 횟수만큼 배열의 크기를 설정
            size = i;

        }
        else // 시계 방향으로 더함
        {
            int i = 0;
            points = new Vector3[resolution];
            // resolution은 diff를 등분한 개수로, 등분한 개수만큼 배열이 생성되어야함
            for (float theta = startAng; theta < (int)(startAng + diff); theta += (diff / resolution))
            {

                float x = center.x + radius * Mathf.Cos(theta * Constant.DEG2RAD); // 호의 자취의 x 좌표
                float y = center.y + radius * Mathf.Sin(theta * Constant.DEG2RAD); // 호의 자취의 y 좌표
                Vector3 point = new Vector3(x, y, 0);

                //Debug.Log(startAng);
                //Debug.Log((startAng + diff));
                //Debug.Log("CW" + (diff / resolution));
                points[i] = point;
                
                i++;


            }

            //최종적으로 for문이 반복된 횟수만큼 배열의 크기를 설정
            size = i;
        }

        ArcData data = new ArcData();
        data.points = points;
        data.size = size;


        return data;

        // 중요한 포인트: 시작 지점과 끝 지점으로 그려지는 자취의 점들을 어떻게 제한할 수 있을까







    }




    








'''
