# notebook

# 1.路由
# MyHome 主页
# MyCountDown 倒计时 
# MyDiary 日记
# MyNote 笔记
# MyTodolist  todolist
#


# 2.组件
# 按功能划分
# 2.1ProHome
## LunBotu  上方轮播图
## CarouselCarseoul  轮播图
## 2.1.1 ProSection
### FunctionFunction  功能（轮播图下方小盒子）
### SectionSection 右方侧边栏
### DeadLine  计算当前与指定某天的时间差（天）
### HttpLocation  网址名称地址
# 2.2ProCountDown
# 2.3 ProDiary
# 2.4 ProTodo
# 2.5 ProNote
## 2.5.1 Leftleft
## 2.5.2 RightRight
### MyEditor


# 3.MyHome  路由主页 
# 3.1引用三个组件  LunBotu  FunctionFunction  SectinSection
# 3.1.1  Lunbotu 引用 CarouselCarousel组件
# 3.1.2 FunctionFunction  按功能划分四个路由  MyNote MyDiary MyTodolist MyCountDown 
# 3.1.3 SectionSection  引用日历插件Calendar 和 HttpLocation DeadLine组件


# section左边是创建的按钮，下边每创建一条显示标题，标题最右边有删除
# 参考note ，默认显示第一条笔记
# 点击创建弹出右边的myeditor组件，点击下面的每一条笔记，显示出内容，editor内容框获取笔记内容
# 在标题里，右键，选择重命名，复制，粘贴和删除