function ReverseSentence(str)
{
   	if (!str || str.length === 0) return "";

   	return str.split(" ").reverse().join(" ");
}