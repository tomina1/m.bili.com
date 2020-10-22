<<template>
    <div>
        <!-- <van-cell-group>
            <van-field v-model="value" label="+86" placeholder="请输入常用的手机号"  center clearable>
                <template #button>
                    <van-button size="small" type="primary" center clearable>发送验证码</van-button>
                </template>
            </van-field>
             <van-field v-model="value" label="验证码" placeholder="请输入验证码" center clearable/>
        </van-cell-group> -->
         <van-field v-model="content" 
            :label="label" 
            :placeholder="placeholder" 
            :type="type"
            :rule="rule"
         />
    </div>
</template>
<script>
export default {
     components:{

    },
    props:["label","placeholder","type","rule"],
    data() {
        return {
            content:''
        }
    },
    computed:{

    },
    watch: {
        content(){
            this.handlerrule()
        }
    },
    methods: {
        handlerrule(){
            const rue=new RegExp(this.rule)//字符串转换为正则
            if(rue.test(this.content)){
                //  console.log(this.content)
                this.$emit('inputchange',this.content)
            }else{
                 this.$emit('inputchange','')
            }
        }
    },
}
</script>
<style lang="less" scoped>

</style>