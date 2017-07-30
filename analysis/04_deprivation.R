

## deprivation index
depri <- read.table("otagoDepIndexAU.txt", sep="\t", header=TRUE)
AUinreg <- concordance %>% select(AU2013_code, dn_ql) %>% distinct()
depriv <- merge(depri, AUinreg, by.x="CAU_2013", by.y="AU2013_code")

el_strs <- merge(local, depriv, by.x="AU2013", by.y="CAU_2013") %>%
  filter(!is.na(CAU_average_NZDep_score_2013)) %>%
  mutate(quantile = ntile(CAU_average_NZDep_score_2013, 5),
         colour= colour_steps[quantile]) %>%
  select(geometry, selector=dn_ql, cols=colour, value=CAU_average_NZDep_score_2013)


Qnum = 4
fivesteps = c("high deprivation", "deprivation", "neutral", "little deprivation", "low deprivation")
statement= "deprivation index"
top_of_graph(el_strs, "Mosgiel Taieri", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "East Coast", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "Saddle Hill", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "South Dunedin", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "Cargill", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "Hills", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()

#####
## Deprivation Index and influence on council
el_strs$reported <- 0
el_strs$reported[el_strs$selector == "Mosgiel Taieri"] <- 56
el_strs$reported[el_strs$selector == "East Coast"] <- 54
el_strs$reported[el_strs$selector == "Saddle Hill"] <- 62
el_strs$reported[el_strs$selector == "South Dunedin"] <- 53
el_strs$reported[el_strs$selector == "Cargill"] <- 43
el_strs$reported[el_strs$selector == "Hills"] <- 49
png(height=480, width = 640, filename = "deprivation4.png", res=72)
par(mar=c(5,5,4,2)+0.1)
plot(el_strs$reported, el_strs$value, col=el_strs$cols, pch=19,
     bty="n", xlab="Survey: no influence on Council (%)",
     ylab="Deprivation index of area unit",
     xlim=c(min(el_strs$reported)-5,max(el_strs$reported)+5),
     main="Ability to influence council and area deprivation")
labs <- el_strs %>% group_by(selector, reported) %>%
  summarise(height=905)
labs$reported[labs$selector == "South Dunedin"] <- labs$reported[labs$selector == "South Dunedin"] -1
labs$height[labs$selector == "South Dunedin"] <- labs$height[labs$selector == "South Dunedin"] +100
labs$height[labs$selector == "Waikouaiti to Peninsula"] <- labs$height[labs$selector == "Waikouaiti to Peninsula"] +100
text(x=labs$reported,y=labs$height,labels=labs$selector,
     srt=90,pos=4, cex=1, offset=.7)
par(mar=old_par$mar)
dev.off()