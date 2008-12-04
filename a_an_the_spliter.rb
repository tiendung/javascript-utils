s = "A man. The car ha ha. aaaaan apple. an cat"
e = " #{s}".split(/\s+(a|an|the)\s+/i)
x = e[1..-1].each_slice(2).map{|b| b.join(" ")}