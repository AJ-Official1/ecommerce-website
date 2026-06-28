import ollama

print("🤖 Offline AI Chat (Type 'exit' to quit)\n")

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        print("Goodbye!")
        break

    print("AJAI: ", end="", flush=True)

    stream = ollama.chat(
        model="tinyllama",
        messages=[{"role": "user", "content": user_input}],
        stream=True
    )

    for chunk in stream:
        if "message" in chunk:
            print(chunk["message"]["content"], end="", flush=True)

    print("\n")
