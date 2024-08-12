# 초창기에 getProfs.py랑 login.py가 일부 제대로 작동하나 test용으로 만들었던 파일. 이제는 이런 포멧으로 받지는 않는듯.

list1 = { "title": [
    "Professor Elmore's lectures were very engaging and informative. Discussion sections helped learn how to look at code in the manner that we'd be doing on exams.",
    "the discussion sections",
    "The lectures were very important in learning the material. The homeworks and projects helped make the content of the course feel more concrete. The discussions were also great ways to apply the material we were learning in lecture.",
    "discussion sections and homework assignments were very helpful to learning (challenging but integral)",
    "Lectures are useful, but once material gets advanced they can be a bit confusing or disorienting. The discussion sections really help you get a grasp on material and allow you to work with other students on problems.",
    "HW assignments connected directly to the class content.",
    "most learning occurred while doing the assignments and the lectures provided useful context for those assignments.",
    "discussions helped prepare for exams",
    "Lectures and office hours were probably the most useful. Discussions were more or less helpful, having the solutions posted was the most helpful part.",
    "The lectures were a little fast paced but the instructor did a good job of answering questions wherever he could and slowing down when asked to.",
    "Mostly learned through doing the PSets/lectures. Discussions were good to get practice/reinforce material",
    "labs allowed for hands on experience on how to solve issues (similar to exams)",
    "Lectures were extremely applicable and useful. Professor Elmore was excellent at answering any questions we had about what he was doing. During each lecture he would simply show examples of whatever data structure or concept we were learning about, implementing them in ipython and considering different methods, applications for the structure, and thus understanding how the structure worked and why it was relevant. The lectures were thus extremely useful, whether for the nature of programming or otherwise, because I felt equipped by not just the notes I took from lecture but also by seeing the thought process behind the application of each object to apply myself with the homework. The homework was also extremely useful. It emphasized concrete uses of what we were learning, which helped me think about real–life applications of the knowledge (besides enjoying learning about these concepts for their own sake). It also gave me ample opportunity to make mistakes, to implement the objects we learned about many times, and to approximate pythonic code. Finally, however, some of the problems were truly challenging, forcing me to better understand the problem I was trying to solve, its applications to other problems in the same problem set, and thus making me a better programmer. I must say that the projects felt simply like glorified homework assignments––however, they had the unified theme of solving the task of creating a library hub, which I suppose warrants to some extent the idea of calling them projects. In addition, some assignment problems had vague wording that failed to specify the requirements of the solution––specifically, split_lines on HW 4 did not detail what to do when the string was greater than the length––this was by necessity learned through trial and error with pytest. Thus when on the final we had to create a dictionary with values of None for each index in the list that we were given, I had no trouble doing so, because the assignments we had been given had entailed similar processes. The discussion sections, although my TA was kind and helpful, did not really help much with my understanding until the last one––and even then, I had missed a couple of relevant lectures, so it was possible that I would have seen similar examples previously otherwise. They simply felt like a repetition of what we had already learned. I think if the discussion sections were optional, the course overall would adapt itself more to different feelings of comfort with the material. As a final note: I did NOT feel like the midterm or final were \"out to get me\" or meant to \"weed me out\" or \"tank my grade\". I don't believe any of the problems went beyond the scope of what we would necessarily have learned by completing the homeworks, and thus I don't think any content on the midterm or final was unfair as far as I can remember.",
    "Professor Elmore’s lectures were informative and prepared me well for pests and the exams. Discussion sessions were useful as prep for exams and working out ideas.",
    "Lectures were pretty good. HW and discussion sessions helped the most",
    "Lectures were slightly fast but notes were given out (from Prof Ng’s classes) so they were okay to catch up with. Also discussion sections were very helpful.",
    "Lectures conveyed new information, and weekly homework assignments/projects gave a chance to practice the material. Discussion sections did not contribute to my learning at all.",
    "Lectures introduced topics, and assignments (homework and two projects) had us apply what we learned.",
    "learned from doing homework, projects, and reading textbook",
    "Lectures were extremely helpful. OH were chaotic but still helpful"
]}

for l in list1["title"][10:]:
    print(l)
