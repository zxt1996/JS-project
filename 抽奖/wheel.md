# 命运轮盘接口文档

1. 获取奖品列表

    * API地址
    
        > http://student.bluej.cn/index/wheel/get_prize_list
    
    * 返回结果***data***说明
    
        ```
        id(奖品ID)
        
        name(奖品名称)
        
        diagram(奖品图片)
        
        grade_id(奖品等级)
        
        ```
    
    * 返回结果示例
    
        ```json
        {
            "res": 1,
            "msg": "成功抽奖",
            "data": {
                "prize_list": [{
                        "id": 1,
                        "name": "melon",
                        "diagram": "xxx.jpg",
                        "grade_id": "1"
                    }
                ]
            }
        }
        ```

2. 获取抽奖记录

    * API地址
    
        > http://student.bluej.cn/index/wheel/get_draw_record_list
    
    * 请求参数
    
        ```
        page(当前页码)
        
        page_num(页面个数)
        
        ```
    
    * 返回结果***data***说明
    
        ```
        all_page(全部页码)
        
        page(当前页码)
        
        id(抽奖ID)
        
        draw_time_stamp(抽奖时间戳)
        
        phone(电话号码)
        
        prize_id(奖品ID)
        
        prize_name(奖品名称)
        
        grade_id(奖品名称)
        
        ```
    
    * 返回结果示例
    
        ```json
        {
            "res": 1,
            "msg": "成功获取",
            "data": {
                "all_page": 1,
                "page": 1,
                "draw_record_list": [{
                        "id": 3,
                        "draw_time_stamp": "1561536857",
                        "phone": "131xxxxxxxx",
                        "prize_id": 2,
                        "prize_name": "melon",
                        "grade_id": "1"
                    }
                ]
            }
        }
        ```

3. 获取顶部抽奖记录

    * API地址
    
        > http://student.bluej.cn/index/wheel/get_top_draw_record_list
    
    
    * 返回结果***data***说明
    
        ```
        
        id(抽奖ID)
        
        draw_time_stamp(抽奖时间戳)
        
        phone(电话号码)
        
        prize_id(奖品ID)
        
        prize_name(奖品名称)
        
        grade_id(奖品名称)
        
        ```
    
    * 返回结果示例
    
        ```json
        {
            "res": 1,
            "msg": "成功获取",
            "data": [{
                    "id": 2,
                    "draw_time_stamp": "1561536846",
                    "phone": "15602295756",
                    "grade_id": 1,
                    "prize_id": 1,
                    "prize_name": "melon"
                }
            ]
        }
        ```

4. 请求抽奖

    * API地址
    
        > http://student.bluej.cn/index/wheel/draw
    
    * 请求参数
    
        ```
        phone(手机号码)
        
        ```
    
    * 返回结果***data***说明
    
        ```
        bingo_prize_id(中奖的奖品ID)
        
        ```
    
    * 返回结果示例
    
        ```json
        {
            "res": 1,
            "msg": "成功获取",
            "data": {
                "bingo_prize_id": 1
            }
        }
        ```
        
        
        
