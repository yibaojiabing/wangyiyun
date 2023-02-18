<template>
    <div class="iconList">
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuijian"></use>
            </svg>
            <div>每日推荐</div>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhibo"></use>
            </svg>
            <div>私人FM</div>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <div>歌单</div>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <div>排行榜</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.iconList{
    width: 100%;
    height: 2rem;
    margin-top: .2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconItem{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .icon{
            width: 1rem;
            height: 1rem;
        }
    }
}
</style>