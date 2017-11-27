import java.util.*;
public class Test{
    public static void main(String[] args) {
        String[] arr = {"abc","cde","efg","fb"};
        canStrArrStartAndEndEqual(arr);
    }

    //题目，给定字符串数组，判断能否有首位相接的排序
    public static int canStrArrStartAndEndEqual(String[] arr) {
         Map<Character, Integer> map1 = new HashMap<Character, Integer>();
	     Map<Character, Integer> map2 = new HashMap<Character, Integer>();
	     
	     int len = arr.length;
	     for (int i = 0; i < len; i++) {
	         String s = arr[i];
	         int l = s.length();
	         if (l != 0) {
	             char c1 = s.charAt(0),
	                  c2 = s.charAt(l-1);
	             
	             if (map1.get(c1) != null) {
	                 map1.put(c1, map1.get(c1)+1);
	             } else {
	                 map1.put(c1, 1);
	             }
	             
	             if (map2.get(c2) != null) {
	                 map2.put(c2, map2.get(c2)+1);
	             } else {
	                 map2.put(c2, 1);
	             }
	         }
	     }
	     
	     int flag = 0;
	      Iterator iter = map1.entrySet().iterator();   
	      while (iter.hasNext()) {
	          Map.Entry entry = (Map.Entry) iter.next();  
	          Object key = entry.getKey();
	          Object v1 = map1.get(key);
	          Object v2 = map2.get(key);
	          
	          if (v1 != v2) flag++;
	          map2.put((Character)key, -1);
	      }
	      Iterator iter1 = map2.entrySet().iterator();  
	      while (iter1.hasNext()) {
	          Map.Entry entry = (Map.Entry) iter1.next();  
	          Object key = entry.getKey();
	          Object v2 = map2.get(key);
	          if ((Integer)v2 != -1) flag++;
	      }
	      
	      
	      System.out.println(flag > 2 ? -1 : 1);
    }
}