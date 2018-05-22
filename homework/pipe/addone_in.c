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
	const char *ptr = str;  //ptr����str�ַ�����ͷ

	if (*str == '-' || *str == '+')  //�����һ���ַ��������ţ�
	{                      //���Ƶ���һ���ַ�
		str++;
    }

    while(*str != 0)
	{
		if ((*str < '0') || (*str > '9'))  //�����ǰ�ַ���������
		{                       //���˳�ѭ��
			break;
		}

        temp = temp * 10 + (*str - '0'); //�����ǰ�ַ��������������ֵ
		str++;      //�Ƶ���һ���ַ�

    }   

    if (*ptr == '-')     //����ַ������ԡ�-����ͷ����ת�������෴��
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
