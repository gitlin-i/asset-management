import bcrypt

print("########################################")
# def test(int2):
    
#     a = bcrypt.gensalt(int2)
#     print("문자: {}, 길이 :{}".format(a, len(a)))
#     return a

# b = list(map(test,[10,11,16]))

password = "qqwweerr".encode()
salt = bcrypt.gensalt()
hashed_password = bcrypt.hashpw(password=password,salt= salt)
print(salt)
print(hashed_password)
print(bcrypt.checkpw(password=password,hashed_password=hashed_password))
print("문자: {}, 길이 :{}".format(hashed_password, len(hashed_password)))