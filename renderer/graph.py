#%%
import numpy as np
import matplotlib.pyplot as pp
from scipy.interpolate import make_interp_spline, BSpline


presiuni=[]
#citim presiuni

with open("presiuni.txt","r") as readfile:
    strat=int(readfile.readline().strip('\n'))
    presiuni=[[int(x) for x in line.split(" ")] for line in readfile]
print(strat)
print(presiuni)

#presiuni = [1870, 1850, 1301, 221]
#first0=[1870,1870]


#saturatii=np.array([2224,1286,1022,266,260])

#initializam vectorul cu grosimile fiecarui strat
d=[10]
s=10
for x in range(strat):
    s=s+presiuni[2][x]
    d.append(s)

d2=[0,10]

#d1=np.array([10,15,40,50,55])

first=[presiuni[1][0],presiuni[1][1]]
first0=[presiuni[0][0],presiuni[0][0]]
print(first)
#xnew = np.linspace(d1.min(), d1.max(), 200) 
presiuni[1].pop(0)
#define spline
#spl = make_interp_spline(d1, presiuni[1],k=3)
#y_smooth = spl(xnew)

#create smooth line chart 
pp.plot(d2,first, color='b')
pp.plot(d2,first0, color='r')
pp.plot(d,presiuni[0], color='r', label='presiuni')
d.append(s+10)
pp.plot(d,presiuni[1], color='b', label='saturatie')
first2=[presiuni[0][strat],presiuni[0][strat]]
d1=[d[strat],d[strat+1]]
pp.plot(d1,first2, color='r')
#pp.plot(xnew,y_smooth,color='b',label='saturatie')
for x in range(strat+1):
    pp.axvline(x = d[x], color = 'purple',linestyle='dotted')
for i,j in zip(d,presiuni[0]):
    pp.text(i, j+0.5, '({}, {})'.format(i, j))
pp.title("Diagrama presiunilor")
pp.xlabel("Grosimea straturilor")
pp.ylabel("Valori presiuni")
pp.legend(loc="upper right")
pp.show()
 # %%
