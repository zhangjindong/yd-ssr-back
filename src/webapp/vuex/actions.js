import request  from "axios";
request.defaults.baseURL= "http://dev.yidengxuetang.com:8081/";
// export const getTopics = ({commit,state})=>{
// 	return request.get('users/1').then((response)=>{
// 		console.log("response", response);
// 		if (response.statusText == 'OK') {
// 			commit("TOPICS_LIST",response.data.data);
// 		}
// 	})
// }
export const increment = ({commit})=>commit('INCREMENT');
export const decrement = ({commit})=>commit('DECREMENT');

export const getUserInfo = ({commit,state})=>{
	return request.get('users/getUserInfo').then((response)=>{
		console.log("response", response.data);
		if (response.statusText == 'OK') {
			commit("USER_INFO",response.data);
		}
	})
}


