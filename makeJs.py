#!/bin/python3
import glob
import os

htmlConstruct = "<script src='REPLACE'></script>"

def classFinder(path):
    cls = []
    for p in glob.glob(path + "/*"):
        p = p.replace("\\", "/") 
        if os.path.isdir(p):
            for x in classFinder(p):
                if(".js" in x): 
                    cls.append(x)

        else:
            cls.append(p)

    return cls

classes = classFinder("Source/Lib")

for cl in classFinder("Source/Classes"):
    classes.append(cl)

for cl in classFinder("Source/Effects"):
    classes.append(cl)

classes.append("menu.js")
classes.sort()



print("Found: ")
for x in classes:
    print("   ", x)

print("Making index.html file")

l = ""
for x in classes:
    l+= "\t\t" + htmlConstruct.replace("REPLACE", x) + "\n"

template = open("index.html.template")
fd = template.read().replace("<!-- ARRAY -->", l)
template.close()

print("Writing index.html file")

fineJS = open("index.html", "w")
fineJS.write(fd)
fineJS.close()