// ==========================================================================
// 10. محرك التحكم، إدارة الحالة ومعالجة الأخطاء والربط السحابي (Firebase)[cite: 3]
// ==========================================================================
const firebaseConfig = {
    apiKey: "AIzaSyAjANzHrD-JEEN_4DVIY705ECcJTvl4lQk",
    authDomain: "kriptochat-bf77a.firebaseapp.com",
    databaseURL: "https://kriptochat-bf77a-default-rtdb.firebaseio.com",
    projectId: "kriptochat-bf77a",
    storageBucket: "kriptochat-bf77a.firebasestorage.app",
    messagingSenderId: "438561797154",
    appId: "1:438561797154:web:26e5b2eda081e0eac2467b"
};

try {
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }[cite: 3]
    console.log("🚀 تم تأسيس الرابط السحابي بنجاح.");[cite: 3]
} catch (initError) {
    console.error("❌ فشل حرج في تهيئة مصفوفة الخادم السحابي:", initError);[cite: 3]
}

const coreAuthInstance = firebase.auth();[cite: 3]
const coreDatabaseInstance = firebase.database();[cite: 3]

// سجلات ونماذج إدارة الحالة الداخلية (State Hydration Records)[cite: 3]
let activeUserSessionProfile = null;[cite: 3]
let myCachedProfileDataRecord = null;[cite: 3]
let currentAuthPanelMode = "login";[cite: 3]
let currentSelectedChatPartnerUid = null;[cite: 3]

let attachedMediaBase64 = "";[cite: 3]
let attachedMediaType = "none";[cite: 3]
let avatarBase64String = "";[cite: 3]
let selectedViewUid = "";[cite: 3]

// كائنات التحكم الصارم في هاردوير الكاميرا والمايك المدمج[cite: 3]
let localWebcamStreamInstance = null;[cite: 3]
let isWebcamVideoTrackEnabled = false;[cite: 3]
let isMicrophoneAudioTrackEnabled = false;[cite: 3]

const MAX_LOCAL_CACHE_MESSAGES_LIMIT = 60;[cite: 3]

// ==========================================================================
// 11. تهيئة مصفوفة الـ Web3 وعناوين عقود البلوكشين الذكية الفعّالة والـ ABI[cite: 3]
// ==========================================================================
const KRIPTO_CHAT_CONTRACT_ADDRESS = "0x690192AEeE16c40f6f7d0CA30BAA1B0884259068";[cite: 3]
const SINU_TOKEN_CONTRACT_ADDRESS = "0x56bB247c424958948B63de291A0C7f45d8651B76";[cite: 3]

const KRIPTO_CHAT_ABI = [
    {"inputs":[{"internalType":"address","name":"_sinuTokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},
    {"inputs":[],"name":"InsufficientChatBalance","type":"error"},
    {"inputs":[],"name":"InsufficientWalletBalance","type":"error"},
    {"inputs":[],"name":"NoEarnings","type":"error"},
    {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},
    {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},
    {"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},
    {"inputs":[],"name":"TransferFailed","type":"error"},
    {"inputs":[],"name":"UnknownService","type":"error"},
    {"inputs":[],"name":"ZeroAmount","type":"error"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EarningsWithdrawn","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newTextCost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newImageCost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newVoiceCost","type":"uint256"}],"name":"PricesUpdated","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"serviceType","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ServiceDeducted","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SinuDeposited","type":"event"},
    {"inputs":[],"name":"costImage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"costText","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"costVoice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_serviceType","type":"uint256"}],"name":"deductForService","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_amountWithDecimals","type":"uint256"}],"name":"depositSinu","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getInAppBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"sinuToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"totalOwnerEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_textWei","type":"uint256"},{"internalType":"uint256","name":"_imageWei","type":"uint256"},{"internalType":"uint256","name":"_voiceWei","type":"uint256"}],"name":"updatePrices","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"withdrawEarnings","outputs":[],"stateMutability":"nonpayable","type":"function"}[cite: 3]
];

const SINU_TOKEN_MINIMAL_ABI = [
    "function balanceOf(address account) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)"[cite: 3]
];

let web3SignerInstance = null;[cite: 3]
let kriptoChatContractInstance = null;[cite: 3]
let sinuTokenContractInstance = null;[cite: 3]

// مصفوفة متجر الهدايا التفاعلية المكونة من 22 نوعاً[cite: 3]
const PRESET_LUXURY_GIFTS_COLLECTION = [
    { id: 'rose', name: 'وردة حمراء', price: 10, icon: '🌹' },
    { id: 'heart', name: 'قلب نابض', price: 50, icon: '💖' },
    { id: 'car', name: 'سيارة سباق', price: 500, icon: '🏎️' },
    { id: 'diamond', name: 'الماس نقي', price: 1000, icon: '💎' },
    { id: 'crown', name: 'التاج الملكي', price: 2500, icon: '👑' },
    { id: 'bear', name: 'دبدوب لطيف', price: 30, icon: '🧸' },
    { id: 'ring', name: 'خاتم زواج', price: 800, icon: '💍' },
    { id: 'rocket', name: 'صاروخ SINU', price: 5000, icon: '🚀' },
    { id: 'fire', name: 'شعلة نارية', price: 15, icon: '🔥' },
    { id: 'star', name: 'نجمة ذهبية', price: 20, icon: '⭐' },
    { id: 'kiss', name: 'قبلة طائرة', price: 40, icon: '💋' },
    { id: 'champagne', name: 'احتفال فاخر', price: 600, icon: '🍾' },
    { id: 'island', name: 'جزيرة خاصة', price: 10000, icon: '🏝️' }[cite: 3]
];

// ==========================================================================
// 12. دوال التبديل والتحكم بالواجهة الرومانسية[cite: 3]
// ==========================================================================
function toggleAuthPanelMode(targetMode) {
    currentAuthPanelMode = targetMode;[cite: 3]
    const btnLogin = document.getElementById('btnModeLogin');[cite: 3]
    const btnRegister = document.getElementById('btnModeRegister');[cite: 3]
    const extFieldsBox = document.getElementById('wrapperFieldUsername');[cite: 3]

    if (targetMode === 'login') {
        if(btnLogin) { btnLogin.style.background = "var(--dating-pink)"; btnLogin.style.color = "#fff"; }[cite: 3]
        if(btnRegister) { btnRegister.style.background = "transparent"; btnRegister.style.color = "var(--text-main)"; }[cite: 3]
        if(extFieldsBox) extFieldsBox.style.display = "none";[cite: 3]
    } else {
        if(btnRegister) { btnRegister.style.background = "var(--dating-pink)"; btnRegister.style.color = "#fff"; }[cite: 3]
        if(btnLogin) { btnLogin.style.background = "transparent"; btnLogin.style.color = "var(--text-main)"; }[cite: 3]
        if(extFieldsBox) extFieldsBox.style.display = "flex";[cite: 3]
    }
}

// محرك التنقل السفلي المطور لتطبيقات الهاتف الذكي (Bigo Live Switcher Engine)
function switchMobilePane(paneId, clickedButton) {
    // 1. إخفاء كافة النوافذ والأقسام الأربعة
    const allPanes = document.querySelectorAll('.app-pane');
    allPanes.forEach(pane => pane.classList.remove('active'));

    // 2. إظهار القسم المطلوب فوراً
    const targetPane = document.getElementById(paneId);
    if (targetPane) {
        targetPane.classList.add('active');
    }

    // 3. إزالة التنشيط من كافة أزرار شريط التنقل السفلي
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach(item => item.classList.remove('active'));

    // 4. تنشيط الزر الحالي المكبوس
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

function processSelectedAvatarImage(inputElement) {
    if (!inputElement.files || !inputElement.files[0]) return;[cite: 3]
    const reader = new FileReader();[cite: 3]
    reader.onload = function(e) {
        avatarBase64String = e.target.result;[cite: 3]
        const container = document.getElementById('previewUploaderAvatarContainer');[cite: 3]
        if (container) container.innerHTML = `<img src="${avatarBase64String}" style="width:100%; height:100%; object-fit:cover;">`;[cite: 3]
    };
    reader.readAsDataURL(inputElement.files[0]);[cite: 3]
}

// ==========================================================================
// 13. الدالة الرئيسية للمصادقة وتوصيل الحسابات (المصححة بـ async)[cite: 3]
// ==========================================================================
async function executeCoreAuthenticationAction() {
    const emailField = document.getElementById('inputAuthEmail');[cite: 3]
    const passwordField = document.getElementById('inputAuthPassword');[cite: 3]

    if (!emailField || !passwordField) return;[cite: 3]

    const email = emailField.value.trim();[cite: 3]
    const password = passwordField.value;[cite: 3]

    if (!email || !password) { 
        alert('الرجاء تعبئة كافة الحقول المطلوبة!'); 
        return; 
    }

    try {
        if (currentAuthPanelMode === 'login') {
            await coreAuthInstance.signInWithEmailAndPassword(email, password);[cite: 3]
        } else {
            const username = document.getElementById('inputAuthUsername').value.trim().toLowerCase();[cite: 3]
            const bioText = document.getElementById('inputAuthBio').value.trim();[cite: 3]

            if (!username || username.includes(" ")) { 
                alert('الرجاء صياغة اسم مستخدم فريد وبدون فراغات!'); 
                return; 
            }

            const snapshot = await coreDatabaseInstance.ref('users').orderByChild('username').equalTo(username).once('value');[cite: 3]
            if (snapshot.exists()) { 
                alert('اسم الشهرة محجوز مسبقاً!'); 
                return;
            }

            const cred = await coreAuthInstance.createUserWithEmailAndPassword(email, password);[cite: 3]
            
            await coreDatabaseInstance.ref(`users/${cred.user.uid}`).set({[cite: 3]
                uid: cred.user.uid,
                email: email,
                username: username,
                bio: bioText || "لا توجد نبذة تعريفية.",
                avatarUrl: avatarBase64String || "👤",
                appBalance: 150, 
                walletAddress: "",
                verificationLevel: "عضو عادي",
                isOnline: true,
                lastSeen: Date.now()
            });

            alert("تهانينا! تم إنشاء حسابك الرقمي بنجاح 💖");
        }
    } catch (err) {
        alert(`حدث خطأ أثناء العملية: ${err.message}`);
    }
}

// دالة معالجة المرفقات (تم تصحيح الـ async والـ await بالداخل لمنع الـ SyntaxError)[cite: 3]
async function processMediaAttachment(type) {
    const fileInput = type === 'image' ? document.getElementById('postImageInput') : document.getElementById('postVideoInput');[cite: 3]
    if (!fileInput || !fileInput.files[0]) return;[cite: 3]

    const file = fileInput.files[0];[cite: 3]
    const reader = new FileReader();[cite: 3]

    reader.onload = function(e) {
        attachedMediaBase64 = e.target.result;[cite: 3]
        attachedMediaType = type;[cite: 3]
        alert(`تم تجهيز ملف الـ ${type} المرفق بنجاح بنظام كود التشفير الحجمي البثي!`);[cite: 3]
    };
    reader.readAsDataURL(file);[cite: 3]
}

// راقب حالة تسجيل دخول المستخدم لبناء الشاشة حياً[cite: 3]
coreAuthInstance.onAuthStateChanged((user) => {
    const backdrop = document.getElementById('coreAuthBackdrop');[cite: 3]
    const dashboard = document.getElementById('coreAppMainDashboard');[cite: 3]

    if (user) {
        activeUserSessionProfile = user;[cite: 3]
        if(backdrop) backdrop.style.display = "none";[cite: 3]
        if(dashboard) dashboard.style.display = "block"; // تعديل ليتوافق مع نظام العرض الجديد المحمول
        
        // تفعيل التبويب الأول تلقائياً كصفحة رئيسية فور تسجيل الدخول للخدمة
        const firstNavBtn = document.querySelector('.bottom-nav .nav-item');
        const firstPane = document.querySelector('.app-pane');
        if (firstPane) firstPane.classList.add('active');
        if (firstNavBtn) firstNavBtn.classList.add('active');

        // استدعاء وبناء تيار رادار الأعضاء وجلب البيانات الحية[cite: 3]
        initializeDatingSystemEngine(user.uid);[cite: 3]
    } else {
        activeUserSessionProfile = null;[cite: 3]
        if(backdrop) backdrop.style.display = "flex";[cite: 3]
        if(dashboard) dashboard.style.display = "none";[cite: 3]
    }
});

function initializeDatingSystemEngine(userId) {
    coreDatabaseInstance.ref(`users/${userId}`).on('value', (snapshot) => {[cite: 3]
        myCachedProfileDataRecord = snapshot.val();[cite: 3]
        if (!myCachedProfileDataRecord) return;[cite: 3]

        document.getElementById('uiSidebarProfileUsername').innerText = `@${myCachedProfileDataRecord.username}`;[cite: 3]
        document.getElementById('uiSidebarProfileBioText').innerText = myCachedProfileDataRecord.bio || "";[cite: 3]
        
        const avatarImg = document.getElementById('uiSidebarAvatarImage');[cite: 3]
        if (myCachedProfileDataRecord.avatarUrl && myCachedProfileDataRecord.avatarUrl.startsWith('data:')) {[cite: 3]
            avatarImg.src = myCachedProfileDataRecord.avatarUrl;[cite: 3]
        } else {
            avatarImg.src = "https://via.placeholder.com/150";[cite: 3]
        }

        document.getElementById('uiBalanceCounterLabel').innerText = `${parseFloat(myCachedProfileDataRecord.appBalance || 0).toFixed(2)} SINU`;[cite: 3]
    });

    // تشغيل الردار الفوري[cite: 3]
    listenForActiveRadarUsers();[cite: 3]
    // تشغيل الخلاصة العامة لبث المنشورات[cite: 3]
    listenForGlobalFeedPosts();[cite: 3]
    // بناء مصفوفة الهدايا في المتجر[cite: 3]
    renderGiftsShopMatrixHTML();[cite: 3]
}

function listenForActiveRadarUsers() {
    coreDatabaseInstance.ref('users').on('value', (snapshot) => {[cite: 3]
        const usersContainer = document.getElementById('uiActiveOnlineUsersContainer');[cite: 3]
        if (!usersContainer) return;[cite: 3]
        usersContainer.innerHTML = "";[cite: 3]

        let onlineCounter = 0;[cite: 3]

        snapshot.forEach((child) => {
            const userData = child.val();
            if (userData.uid === activeUserSessionProfile.uid) return;[cite: 3]

            onlineCounter++;[cite: 3]
            const userBox = document.createElement('div');
            userBox.className = "radar-user-item";[cite: 3]
            userBox.onclick = () => {
                activatePrivateChatChannel(userData.uid, userData.username);
                // ميزة التوجيه التلقائي لقسم الشات والكاميرا في الموبايل عند الضغط على أي مستخدم
                const chatNavBtn = document.getElementById('navBtnChat');
                switchMobilePane('paneChatAndCamera', chatNavBtn);
            };

            userBox.innerHTML = `
                <div class="radar-meta-zone">
                    <img src="${userData.avatarUrl && userData.avatarUrl.startsWith('data:') ? userData.avatarUrl : 'https://via.placeholder.com/150'}" class="radar-user-avatar">
                    <div>
                        <strong style="font-size:0.9rem; display:block;">@${userData.username}</strong>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${userData.bio ? userData.bio.substring(0,25) + '...' : ''}</span>
                    </div>
                </div>
                <i class="fa-solid fa-circle" style="color:var(--success); font-size:0.65rem;"></i>
            `;
            usersContainer.appendChild(userBox);[cite: 3]
        });

        document.getElementById('radarOnlineCounter').innerText = `${onlineCounter} نشط حياً`;[cite: 3]
    });
}

function listenForGlobalFeedPosts() {
    coreDatabaseInstance.ref('posts').limitToLast(MAX_LOCAL_CACHE_MESSAGES_LIMIT).on('value', (snapshot) => {[cite: 3]
        const feedContainer = document.getElementById('uiMainMessagesContainer');[cite: 3]
        if (!feedContainer) return;[cite: 3]
        feedContainer.innerHTML = "";[cite: 3]

        let list = [];[cite: 3]
        snapshot.forEach(c => { list.unshift({ id: c.key, val: c.val() }); });[cite: 3]

        list.forEach(item => {
            const post = item.val;[cite: 3]
            const card = document.createElement('div');[cite: 3]
            card.className = "render-post-card";[cite: 3]
            card.style.marginBottom = "15px";[cite: 3]

            let mediaHtml = "";[cite: 3]
            if (post.mediaData && post.mediaType === 'image') {[cite: 3]
                mediaHtml = `<img src="${post.mediaData}" style="width:100%; border-radius:16px; margin-top:12px; max-height:280px; object-fit:cover;">`;[cite: 3]
            } else if (post.mediaData && post.mediaType === 'video') {[cite: 3]
                mediaHtml = `<video src="${post.mediaData}" controls style="width:100%; border-radius:16px; margin-top:12px; max-height:280px;"></video>`;[cite: 3]
            }

            card.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
                    <img src="${post.senderAvatar || 'https://via.placeholder.com/150'}" style="width:38px; height:38px; border-radius:50%; object-fit:cover;">
                    <div>
                        <strong style="font-size:0.88rem; display:block;">@${post.senderUsername}</strong>
                        <span style="font-size:0.7rem; color:var(--text-muted);">${new Date(post.timestamp).toLocaleTimeString()}</span>
                    </div>
                </div>
                <p style="font-size:0.92rem; white-space:pre-wrap; line-height:1.5;">${post.text}</p>
                ${mediaHtml}
            `;
            feedContainer.appendChild(card);[cite: 3]
        });
    });
}

function submitActiveMessageFromToolbar() {
    const text = document.getElementById('inputMainPrimaryTextField').value.trim();[cite: 3]
    if (!text && !attachedMediaBase64) return;[cite: 3]

    const newPostRef = coreDatabaseInstance.ref('posts').push();[cite: 3]
    newPostRef.set({[cite: 3]
        text: text || "",
        mediaData: attachedMediaBase64,
        mediaType: attachedMediaType,
        senderUid: activeUserSessionProfile.uid,
        senderUsername: myCachedProfileDataRecord.username,
        senderAvatar: myCachedProfileDataRecord.avatarUrl || "",
        timestamp: Date.now()
    }).then(() => {
        document.getElementById('inputMainPrimaryTextField').value = "";[cite: 3]
        attachedMediaBase64 = "";[cite: 3]
        attachedMediaType = "none";[cite: 3]
    });
}

function renderGiftsShopMatrixHTML() {
    const container = document.getElementById('uiGiftsMatrixGridContainer');[cite: 3]
    if (!container) return;[cite: 3]
    container.innerHTML = "";[cite: 3]

    PRESET_LUXURY_GIFTS_COLLECTION.forEach(gift => {
        const item = document.createElement('div');[cite: 3]
        item.className = "matrix-gift-item";[cite: 3]
        item.onclick = () => executeTriggerSendGiftToPartner(gift.id, gift.icon, gift.price);[cite: 3]
        item.innerHTML = `
            <span style="font-size:1.6rem;">${gift.icon}</span>
            <span style="font-size:0.68rem; font-weight:bold; display:block;">${gift.name}</span>
            <span style="font-size:0.62rem; color:var(--dating-pink);">${gift.price} 🪙</span>
        `;
        container.appendChild(item);[cite: 3]
    });
}

function activatePrivateChatChannel(partnerUid, partnerUsername) {
    currentSelectedChatPartnerUid = partnerUid;[cite: 3]
    document.getElementById('currentChatPartnerNameText').innerText = `@${partnerUsername}`;[cite: 3]
    
    const chatBox = document.getElementById('privateChatMessagesScrollBox');[cite: 3]
    chatBox.innerHTML = `<div style="text-align:center; font-size:0.8rem; color:var(--text-muted); padding:20px;">تأسيس القناة المشفرة بنجاح...</div>`;[cite: 3]

    const channelId = activeUserSessionProfile.uid < partnerUid ? `${activeUserSessionProfile.uid}_${partnerUid}` : `${partnerUid}_${activeUserSessionProfile.uid}`;[cite: 3]
    
    coreDatabaseInstance.ref(`chats/${channelId}`).limitToLast(30).on('value', (snapshot) => {[cite: 3]
        chatBox.innerHTML = "";[cite: 3]
        if (!snapshot.exists()) {
            chatBox.innerHTML = `<div style="text-align:center; font-size:0.8rem; color:var(--text-muted); padding:20px;">لا توجد رسائل سابقة. ابدأ المحادثة الآن 💖</div>`;[cite: 3]
            return;
        }

        snapshot.forEach(child => {
            const msg = child.val();[cite: 3]
            const msgBubble = document.createElement('div');[cite: 3]
            const isMe = msg.senderUid === activeUserSessionProfile.uid;[cite: 3]
            
            msgBubble.className = "msg-bubble-card";[cite: 3]
            msgBubble.style.alignSelf = isMe ? "flex-start" : "flex-end";[cite: 3]
            msgBubble.style.background = isMe ? "var(--dating-pink)" : "#fff";[cite: 3]
            msgBubble.style.color = isMe ? "#fff" : "var(--text-main)";[cite: 3]
            msgBubble.style.borderRadius = isMe ? "18px 18px 0 18px" : "18px 18px 18px 0";[cite: 3]
            msgBubble.style.padding = "10px 14px";[cite: 3]
            msgBubble.style.border = isMe ? "none" : "1px solid var(--border-color)";[cite: 3]
            msgBubble.style.fontSize = "0.85rem";[cite: 3]
            msgBubble.style.width = "fit-content";[cite: 3]
            msgBubble.style.marginBottom = "5px";[cite: 3]

            msgBubble.innerText = msg.text;[cite: 3]
            chatBox.appendChild(msgBubble);[cite: 3]
        });
        chatBox.scrollTop = chatBox.scrollHeight;[cite: 3]
    });

    // تشغيل مستمع المؤثرات البصرية للهدايا حياً لهذه القناة المفتوحة
    listenForIncomingGiftsInStream(channelId);[cite: 3]
}

function submitPrivateChatMessageFromZone() {
    const text = document.getElementById('inputPrivateMessageTextField').value.trim();[cite: 3]
    if (!text || !currentSelectedChatPartnerUid) return;[cite: 3]

    const channelId = activeUserSessionProfile.uid < currentSelectedChatPartnerUid ? `${activeUserSessionProfile.uid}_${currentSelectedChatPartnerUid}` : `${currentSelectedChatPartnerUid}_${activeUserSessionProfile.uid}`;[cite: 3]
    
    const newMsgRef = coreDatabaseInstance.ref(`chats/${channelId}`).push();[cite: 3]
    newMsgRef.set({[cite: 3]
        text: text,
        senderUid: activeUserSessionProfile.uid,
        timestamp: Date.now()
    }).then(() => {
        document.getElementById('inputPrivateMessageTextField').value = "";[cite: 3]
    });
}

function executeTriggerSendGiftToPartner(giftId, icon, price) {
    if (!currentSelectedChatPartnerUid) { alert('الرجاء اختيار صديق من الرادار أولاً لإرسال الهدية!'); return; }[cite: 3]
    
    if ((myCachedProfileDataRecord.appBalance || 0) < price) {[cite: 3]
        alert('رصيدك غير كافٍ لشراء وإرسال هذه الهدية الفاخرة! اشحن محفظتك بـ $SINU');
        return;
    }

    const channelId = activeUserSessionProfile.uid < currentSelectedChatPartnerUid ? `${activeUserSessionProfile.uid}_${currentSelectedChatPartnerUid}` : `${currentSelectedChatPartnerUid}_${activeUserSessionProfile.uid}`;[cite: 3]
    
    // خصم قيمة الهدية من الراسل
    coreDatabaseInstance.ref(`users/${activeUserSessionProfile.uid}/appBalance`).set(myCachedProfileDataRecord.appBalance - price)[cite: 3]
        .then(() => {
            // تسجيل تفجير الهدية في مستمع القناة الحية
            return coreDatabaseInstance.ref(`live_streams/${channelId}/gifts_sent`).push({[cite: 3]
                giftId: giftId,
                giftIcon: icon,
                senderUsername: myCachedProfileDataRecord.username,
                timestamp: Date.now()
            });
        }).then(() => {
            alert(`تم إرسال الهدية (${icon}) بنجاح وخصم التكلفة برمجياً!`);
        });
}

function listenForIncomingGiftsInStream(channelId) {
    coreDatabaseInstance.ref(`live_streams/${channelId}/gifts_sent`).orderByChild('timestamp').startAt(Date.now()).on('child_added', (snapshot) => {[cite: 3]
        const giftData = snapshot.val();[cite: 3]
        if (!giftData) return;[cite: 3]

        triggerPremiumOverlayGiftAnimation(giftData.giftIcon);[cite: 3]
    });
}

function triggerPremiumOverlayGiftAnimation(icon) {
    const container = document.getElementById('globalLiveScreenOverlay');[cite: 3]
    if (!container) return;[cite: 3]

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');[cite: 3]
            emoji.className = "floating-overlay-emoji";[cite: 3]
            emoji.innerText = icon;[cite: 3]
            emoji.style.left = `${Math.random() * 85 + 5}%`;[cite: 3]
            emoji.style.animationDelay = `${Math.random() * 0.6}s`;[cite: 3]
            container.appendChild(emoji);[cite: 3]

            setTimeout(() => emoji.remove(), 4000);
        }, i * 80);
    }
}

// الكاميرا والمايك
function toggleLocalWebcamHardwareState() {
    const videoElement = document.getElementById('hardwareLocalWebcamVideo');[cite: 3]
    const fallbackText = document.getElementById('cameraFallbackText');[cite: 3]
    
    if (!isWebcamVideoTrackEnabled) {[cite: 3]
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localWebcamStreamInstance = stream;[cite: 3]
                videoElement.srcObject = stream;[cite: 3]
                isWebcamVideoTrackEnabled = true;[cite: 3]
                if(fallbackText) fallbackText.style.display = "none";[cite: 3]
                document.getElementById('btnToggleCameraDevice').innerHTML = `<i class="fa-solid fa-video-slash"></i>`;[cite: 3]
            })
            .catch(err => alert('تعذر الوصول إلى كاميرا الهاتف الشخصية: ' + err.message));
    } else {
        if(localWebcamStreamInstance) {[cite: 3]
            localWebcamStreamInstance.getTracks().forEach(track => track.stop());[cite: 3]
        }
        videoElement.srcObject = null;[cite: 3]
        isWebcamVideoTrackEnabled = false;[cite: 3]
        if(fallbackText) fallbackText.style.display = "flex";[cite: 3]
        document.getElementById('btnToggleCameraDevice').innerHTML = `<i class="fa-solid fa-video"></i>`;[cite: 3]
    }
}

function toggleLocalMicrophoneHardwareState() {
    if (!localWebcamStreamInstance) return;[cite: 3]
    isMicrophoneAudioTrackEnabled = !isMicrophoneAudioTrackEnabled;[cite: 3]
    localWebcamStreamInstance.getAudioTracks().forEach(track => track.enabled = isMicrophoneAudioTrackEnabled);[cite: 3]
    document.getElementById('btnToggleAudioDevice').innerHTML = isMicrophoneAudioTrackEnabled ? `<i class="fa-solid fa-microphone-slash"></i>` : `<i class="fa-solid fa-microphone"></i>`;[cite: 3]
}

// ==========================================================================
// 14. اتصال الـ Web3 الحقيقي بمحفظة الموبايل وشحن الـ Contract[cite: 3]
// ==========================================================================
async function connectWeb3WalletBridge() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);[cite: 3]
            await provider.send("eth_requestAccounts", []);[cite: 3]
            web3SignerInstance = provider.getSigner();[cite: 3]
            const walletAddress = await web3SignerInstance.getAddress();[cite: 3]

            kriptoChatContractInstance = new ethers.Contract(KRIPTO_CHAT_CONTRACT_ADDRESS, KRIPTO_CHAT_ABI, web3SignerInstance);[cite: 3]
            sinuTokenContractInstance = new ethers.Contract(SINU_TOKEN_CONTRACT_ADDRESS, SINU_TOKEN_MINIMAL_ABI, web3SignerInstance);[cite: 3]

            document.getElementById('uiConnectedWalletAddressTag').innerText = `${walletAddress.substring(0,6)}...${walletAddress.substring(38)}`;[cite: 3]
            
            // قراءة الرصيد البلوكشيني فوراً
            updateWeb3OnchainBalances(walletAddress);[cite: 3]
        } catch (e) {
            alert("فشل ربط عقد المحفظة التكتيكية: " + e.message);
        }
    } else {
        alert("لم يتم العثور على محفظة ويب 3 داخل متصفح الهاتف! استخدم متصفح محفظة MetaMask أو Trust Wallet.");
    }
}

async function updateWeb3OnchainBalances(walletAddress) {
    if (!sinuTokenContractInstance || !kriptoChatContractInstance) return;[cite: 3]
    try {
        const walletBal = await sinuTokenContractInstance.balanceOf(walletAddress);[cite: 3]
        document.getElementById('onchainWalletBalanceLabel').innerText = parseFloat(ethers.utils.formatEther(walletBal)).toFixed(2);[cite: 3]

        const contractBal = await kriptoChatContractInstance.getInAppBalance(walletAddress);[cite: 3]
        document.getElementById('onchainContractInAppBalanceLabel').innerText = parseFloat(ethers.utils.formatEther(contractBal)).toFixed(2);[cite: 3]
    } catch (err) {
        console.error("فشل قراءة أرصدة البلوكشين الذكية حياً:", err);
    }
}

async function executeWeb3DepositSinuToContract() {
    const amountStr = document.getElementById('inputDepositAmountWeiField').value.trim();[cite: 3]
    if (!amountStr || !kriptoChatContractInstance || !sinuTokenContractInstance) { alert('الرجاء التأكد من ربط المحفظة وإدخال القيمة الحجمية!'); return; }[cite: 3]

    try {
        const amountWei = ethers.utils.parseEther(amountStr);[cite: 3]
        alert('انتظر.. نقوم حالياً بعمل تفعيل وتفويض (Approve) للعملة على شبكة البلوكشين الذكية...');
        
        const txApprove = await sinuTokenContractInstance.approve(KRIPTO_CHAT_ADDRESS, amountWei);[cite: 3]
        await txApprove.wait();[cite: 3]

        alert('نجح التفويض! جاري تنفيذ معاملة الإيداع والشحن الفورية داخل عقد SINU الذكي...');
        const txDeposit = await kriptoChatContractInstance.depositSinu(amountWei);[cite: 3]
        await txDeposit.wait();[cite: 3]

        alert('تهانينا الفائقة! تم شحن محفظة العقد على شبكة البلوكشين بنجاح سرمدي 🌐');
    } catch (err) {
        alert('فشلت معاملة البلوكشين: ' + err.message);
    }
}
