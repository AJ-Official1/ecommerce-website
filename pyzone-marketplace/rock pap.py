import random

def get_user_choice():
    while True:
        user_choice = input("Choose rock (r), paper (p), or scissors (s): ").lower()
        if user_choice in ['r', 'p', 's']:
            return user_choice
        else:
            print("Invalid choice! Please enter 'r', 'p', or 's'.")

def get_computer_choice():
    choices = ['r', 'p', 's']
    return random.choice(choices)

def determine_winner(user_choice, computer_choice):
    # Return 0 for a tie, 1 if the user wins, 2 if the computer wins
    if user_choice == computer_choice:
        return 0
    elif (user_choice == 'r' and computer_choice == 's') or \
         (user_choice == 'p' and computer_choice == 'r') or \
         (user_choice == 's' and computer_choice == 'p'):
        return 1
    else:
        return 2

def print_result(result, user_choice, computer_choice):
    if result == 0:
        print(f"It's a tie! Both chose {translate_choice(user_choice)}.")
    elif result == 1:
        print(f"You win! {translate_choice(user_choice)} beats {translate_choice(computer_choice)}.")
    else:
        print(f"You lose! {translate_choice(computer_choice)} beats {translate_choice(user_choice)}.")

def translate_choice(choice):
    if choice == 'r':
        return "rock"
    elif choice == 'p':
        return "paper"
    elif choice == 's':
        return "scissors"

def play_game():
    print("Let's play Rock, Paper, Scissors!")
    user_choice = get_user_choice()
    computer_choice = get_computer_choice()
    print(f"\nYou chose: {translate_choice(user_choice)}")
    print(f"Computer chose: {translate_choice(computer_choice)}\n")
    result = determine_winner(user_choice, computer_choice)
    print_result(result, user_choice, computer_choice)

while True:
    play_game()
    play_again = input("Do you want to play again? (yes/no): ").lower()
    if play_again != 'yes':
        print("Thanks for playing!")
        break
