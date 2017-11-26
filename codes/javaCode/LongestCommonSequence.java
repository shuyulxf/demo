import java.util.*;
public class Test{
    public static void main(String[] args) {
        String[] arr = {"abc","cde","efg","fb"};
        canStrArrStartAndEndEqual(arr);
    }

    //题目，给定字符串数组，判断能否有首位相接的排序
    public static int LongestCommonSequence(String str1, String str2) {
        
        if (str1 == null || str2 == null) return 0;
		int m = str1.length(),
			n = str2.length();
		
		if (m == 0 || n == 0) return 0;
		
		int[][] L = new int[m+1][];
		for (int i = 0; i <= m; i++) {
			L[i] = new int[n+1];
			Arrays.fill(L[i], 0);
		}
		
		for (int j = 1; j <= m; j++) {
			for (int k = 1; k <= n; k++) {
				if (str1.charAt(j-1) == str2.charAt(k-1)) {
					L[j][k] = L[j-1][k-1] + 1;
				} else {
					L[j][k] = Math.max(L[j-1][k], L[j][k-1]);
				}
			}
		}
		
        return L[m][n];
    }
}