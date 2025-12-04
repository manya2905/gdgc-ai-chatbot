
import streamlit as st
import requests  


BACKEND_CHAT_URL = "http://localhost:3000/chat"


st.set_page_config(
    page_title="GDGC AI Assistant",
    page_icon="🤖",
    layout="wide"
)


#i have taken this image from your website 
st.markdown("""
    <div style='display:flex; align-items:center; gap:10px; padding:15px;
         background:black; border-radius:10px;'>
        <img src='https://media.licdn.com/dms/image/v2/D563DAQHckHOarY6jgQ/image-scale_191_1128/image-scale_191_1128/0/1728340572228/gdg_simats_cover?e=2147483647&v=beta&t=778ZQivzTX2j5ywtnBYxuC7gE6rKBr32IS932UPm1iQ' width='150'; height='60'>
        <h2 style='margin:0;'>Google Developer Groups</h2>
    </div>
""", unsafe_allow_html=True)


st.markdown("""
    <div style='background:#69a9a0; padding:16px; border-radius:0 0 15px 0;
         color:black; font-size:26px; font-weight:700; margin-bottom:20px;'>
        AI Assistant
    </div>
""", unsafe_allow_html=True)



if "chat_history" not in st.session_state:
   
    st.session_state.chat_history = [
        {"role": "ai", "text": "Hello! I'm your AI assistant. How can I help you today?"}
    ]



for entry in st.session_state.chat_history:
    if entry.get("role") == "user":
   
        st.markdown(
            f"""
            <div style='text-align:right;'>
                <div style='display:inline-block; background:#69a9a0; color:black; 
                     padding:12px 18px; border-radius:20px; margin:6px 0;'>
                    {entry.get("text")}
                </div>
            </div>
            """,
            unsafe_allow_html=True
        )
    else:
      #i have taken images from google 
        st.markdown(
            f"""
            <div style='display:flex; align-items:flex-start; gap:10px; margin:6px 0; color:black;'>
                <img src='https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740&q=80' width='45'>
                <div style='background:#e4e4e4; padding:12px 18px; border-radius:20px;'>
                    {entry.get("text")}
                </div>
            </div>
            """,
            unsafe_allow_html=True
        )




raw_user_text = st.text_input("Type your message…")


if st.button("Send") and raw_user_text.strip():


    cleaned_msg = raw_user_text.strip()  
    st.session_state.chat_history.append({"role": "user", "text": cleaned_msg})

    try:
        
        reply = requests.post(BACKEND_CHAT_URL, json={"question": cleaned_msg})
        reply_data = reply.json()

      
        bot_text = reply_data.get("answer", "Hmm... backend didn't give me any answer.")
        st.session_state.chat_history.append({"role": "ai", "text": bot_text})

    except Exception as err:
       
        st.session_state.chat_history.append(
            {"role": "ai", "text": f"Network hiccup: {err}"}
        )

    
    st.rerun()


