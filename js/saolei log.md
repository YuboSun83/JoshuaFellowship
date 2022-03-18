1. html
2. css
3. js
    # 声明变量
        1. choose object oriented
        2. 构造函数Mine，分析形参，tr为行td为列，mineNum是雷数
        3. 函数内设置squares数组，用来储存所有方块信息
        4. 设置tds储存所有方块DON
        5. int surplusMine 计算剩余雷数量
        6. allRight 判断是否游戏成功
        7. parent = querySelector 显示位置

    # 新建表格
        1. Mine的原型上创建表格 for loop循环*2 可以打开检查。需要createdom
        2. 给table添加样式
    
    # 添加随机雷
        1. 函数 randomNum
        2. 生成长度为格子总数的新数组
        3. for loop 放入编号
        4. sort随机排序 sort(function(){return 0.5-Math.random()});
            造成乱序
        5. 用slice取前雷数位
            由于乱序，前99数据就是雷

    # 将方格分类
        1. 在每个方格的位置添加object 储存类型 坐标 如果是number类型 添加value
    
    # 添加雷和数字的样式
        1. 在已经建立好的表格里 判断type 是雷的话 添加class name -->css

    # 设定数字
        如果有九宫格周围有雷 周边数字++
        1. 函数 getAround
        2. if/else 分支
            - 边边 
            - 周围有雷
            - 检测到本身
            发生 --> continue 跳出当前循环
        3. 把合适的坐标存入  ** 注意坐标 **、

        4. 函数 updateNum
        5. for loop 更新雷周围数字 不是雷周围数字可以不用管

    # 添加点击事件
        1. 左键 --> play方法 
        2. play 方法里：
            - 点到数字 显示数字 （css 设置数字样式）
                
                -0 
                    -不显示数据
                    -扩散算法 --> 递归
                        - 显示自己格子
                        - 找四周 如果不为0 停止扩散 为0 递归扩散
                            函数 getAllZero

                -非0 直接显示
                
            - 点到雷 显示所有雷 函数 游戏失败 gameOver


        3. 右键 --> 在父级contextmenu禁用

    # getAllZero 递归算法
    # gameOver 算法
        1. 显示所有的雷
        2. 取消所有格子的点击事件
        3. 给点中的雷标红