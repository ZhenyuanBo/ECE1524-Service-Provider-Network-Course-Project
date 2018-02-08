class Solution {
    public int countSubstrings(String s) {
        int num=0;
        for(int centre=0; center< 2*s.length()-1; center++){
        	int left = centre/2;
        	int right = left + centre%2;
        	while(left>=0 && right < s.length() && s.charAt(left) == s.charAt(right)){
        		num++;
        		left--;
        		right++;
        	}
        }
        return num;
    }
}