#include <stdio.h>  
#include <stdlib.h>  
#include <unistd.h>
#include <string.h>  
#include <errno.h>  
#include <sys/types.h>  
#define BUFFER 255 
int str2int(const char *str)
{
	int temp = 0;
	const char *ptr = str;  //ptr保存str字符串开头

	if (*str == '-' || *str == '+')  //如果第一个字符是正负号，
	{                      //则移到下一个字符
		str++;
    }

    while(*str != 0)
	{
		if ((*str < '0') || (*str > '9'))  //如果当前字符不是数字
		{                       //则退出循环
			break;
		}

        temp = temp * 10 + (*str - '0'); //如果当前字符是数字则计算数值
		str++;      //移到下一个字符

    }   

    if (*ptr == '-')     //如果字符串是以“-”开头，则转换成其相反数
	{
		temp = -temp;
	}
    
	return temp;
}
int main(int argc, char **argv) {  
	
	FILE *fp = NULL;
 	char numStr[100];
 	int num = 0;

    fp = fopen("./addone_integer.txt", "r");
    
	if (fp == NULL){
		perror ("Error opening file");
	}  
	else {
        if ( fgets (numStr , 100 , fp) != NULL ) {
        	num = str2int(numStr);
        	num++;
        	printf("%d", num);
		}
            
        fclose (fp);
    }

    
    return 0;
}  
